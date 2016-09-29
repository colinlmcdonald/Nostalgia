'use strict'

const express       = require('express');
const path          = require('path');
const httpProxy     = require('http-proxy');
const publicPath    = path.resolve(__dirname, 'public');
const fetch         = require('isomorphic-fetch');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const fs            = require('fs');
const http          = require('http');
const querystring   = require('querystring');
const isProduction  = process.env.NODE_ENV === 'production';
const port          = isProduction ? process.env.PORT : 3000;

const User          = require('./db/User.model.js');
const cp            = require('./server/createPlaylist');
const sl            = require('./server/spotifyLogin');
const config        = require('./config.js');

const client_id     = config.CLIENT_ID;
const redirect_uri  = isProduction ? config.REDIRECT_URI : 'http://localhost:3000/callback';
const client_secret = config.SECRET;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

mongoose.connect(config.MONGOD);
const db = mongoose.connection;

const app = express();
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  let access_token, refresh_token;
  return sl.fetchSpotifyAccessToken(code)
  .then(spotify => spotify.json())
  .then(json => {
    console.log('sup with it', json);
    access_token = json.access_token;
    refresh_token = json.refresh_token;
    return sl.fetchSpotifyUser(access_token)
  })
  .then(json => json.json())
  .then(profile => sl.saveSpotifyUser(profile.id, access_token, refresh_token, res))
  .catch(err => {
    console.log(err)
    res.send(err)
  });
});

app.get('/user/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'profile.html'))
});

app.get('/user/:id/profile', (req, res) => {
  User.findOne({id: req.params.id}, (err, user) => {
    return sl.fetchSpotifyUser(user.access_token)
    .then(response => response.json())
    .then(profile => {
      if (profile.error && profile.error.message === 'The access token expired') {
        sl.updateAccessToken(user)
          .then(profile => res.send(profile))
      } else {
        profile.birthday = user.birthday;
        res.send(profile);
      }
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    });
  });
});

app.post('/user/:id/birthday', (req, res) => {
  User.findOne({id: req.params.id}, (err, user) => {
    user.birthday = req.body;
    user.save(() => res.send(user));
  });
});

app.post('/generate-playlist', (req, res) => {
  const year = parseInt(req.body.year);
  const start = year + 14;
  const years = [];
  for (var i = start; i < start + 4; i++) {
    years.push(i);
  };
  cp.scrapeBillboardSongs(years)
    .then(songs => cp.reduceBillboardSongs(songs))
    .then(reducedSongs => res.send(reducedSongs))
    .catch(err => {
      console.log(err)
      res.send(err)
    });
});

app.post('/create-playlist', (req, res) => {
  const id = req.body.id;
  const songs = req.body.playlist;
  User.findOne({id}, (err, user) => {
    cp.createSpotifyPlaylist(user, id)
      .then(response => response.json())
      .then(playlist => cp.addSongsToPlaylist(playlist, songs, id, user.access_token))
      .then(result => res.send(result))
      .catch(err => {
      console.log(err)
      res.send(err)
    });
  });
});

app.post('/check-songs', (req, res) => {
  cp.fetchSpotifySongs(req.body)
    .then(songs => res.send(songs))
    .catch(err => {
      console.log(err)
      res.send(err)
    });
});

if (!isProduction) {
  app.use(morgan('dev'));
  const bundle = require('./compiler/compiler.js')
  bundle()
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
};

proxy.on('error', () => console.log('Could not connect to proxy, please try again...'));

app.listen(port, () => console.log('Server running on port ' + port));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb')
});