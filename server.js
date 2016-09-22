'use strict'

const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const querystring = require('querystring');
const publicPath = path.resolve(__dirname, 'public');
const config = require('./config.js');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var Promise = require('bluebird');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

const Xray = require('x-ray');
const x = Xray();

const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

const app = express();
mongoose.connect(config.MONGOD);

const db = mongoose.connection;
const User = require('./db/User.model.js');

const cp = require('./server/createPlaylist');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const client_id = config.CLIENT_ID;
const redirect_uri = config.REDIRECT_URI;
const client_secret = config.SECRET;

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
  fetch('https://accounts.spotify.com/api/token?' + querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    }
  })
  .then(spotify => spotify.json())
  .then(json => {
    access_token = json.access_token;
    refresh_token = json.refresh_token;
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + json.access_token
      }
    });
  })
  .then(json => json.json())
  .then(profile => {
    User.findOne({id: profile.id}, (err, user) => {
      if (user) {
        user.access_token = access_token;
        user.refresh_token = refresh_token;
        user.save(() => res.redirect('/user/' + user.id));
      } else {
        user = new User({
          id: profile.id,
          access_token: access_token,
          refresh_token: refresh_token
        });
        user.save(() => res.redirect('/user/' + profile.id))
      }
    });
  });
});

app.get('/user/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'profile.html'))
});

app.get('/user/:id/profile', (req, res) => {
  console.log('/user/:id/profile', req.params)
  User.findOne({id: req.params.id}, (err, user) => {
    return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
    .then(profile => profile.json())
    .then(json => {
      json.birthday = user.birthday;
      res.send(json);
    });
  });
});

app.post('/user/:id/birthday', (req, res) => {
  User.findOne({id: req.params.id}, (err, user) => {
    user.birthday = req.body
    user.save(() => {
      res.send(user);
    });
  });
});

app.post('/generate-playlist', (req, res) => {
  const year = parseInt(req.body.year);
  const start = year + 14;
  const years = [];
  for (var i = start; i < start + 4; i++) {
    years.push(i);
  };
  Promise.map(years, year => {
    return new Promise(resolve => {
      x(`http://www.billboard.com/archive/charts/${year}/hot-100`, 'tbody', [{
        songs: ['.views-field-field-chart-item-song'],
        artists: ['.views-field-field-chart-item-artist']
      }])(function(err, titles) {
        resolve(cp.billboardCleanup(titles));
      });
    });
  })
  .then(songs => {
    let reducedSongs = songs.reduce((start, item) => {
      for (var key in item) {
        start[key] = item[key]
      }
      return start
    }, {});
    res.send(reducedSongs)
  })
});

app.post('/create-playlist', (req, res) => {
  const id = req.body.id;
  const playlist = req.body.playlist;
  User.findOne({id}, (err, user) => {
    return fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access_token}`
      },
      body: JSON.stringify({
        name: 'Nostalgia Highschool Playlist'
      })
    })
    .then(result => result.json())
    .then(spotifyPlaylist => {
      const playlistURIs = {};
      playlist.forEach(song => {
        if (song.uri) {
          playlistURIs[song.uri] = true;
        }
      });
      return fetch(`https://api.spotify.com/v1/users/${id}/playlists/${spotifyPlaylist.id}/tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`
        },
        body: JSON.stringify({
          uris: Object.keys(playlistURIs)
        })
      })
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  })
})

app.post('/check-songs', (req, res) => {
  cp.fetchSpotify(req.body)
    .then(songs => {
      res.send(songs)
    })
})

if (!isProduction) {
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