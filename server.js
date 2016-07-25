'use strict'

const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const querystring = require('querystring');
const publicPath = path.resolve(__dirname, 'public');
const config = require('./config.js');
const fetch = require('isomorphic-fetch');
const Promise = require('promise');
const mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

const Xray = require('x-ray');
const x = Xray();

const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

const app = express();
mongoose.connect('mongodb://localhost:27017')

const db = mongoose.connection;

app.use(express.static(publicPath));

const client_id = config.CLIENT_ID;
const redirect_uri = config.REDIRECT_URI;
const client_secret = config.SECRET;

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }))

});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
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
    .then(json => console.log(json))
})

app.post('/billboard', (req, res) => {
  x('http://www.billboard.com/archive/charts/1991/hot-100', 'tbody', [{
    song: ['.views-field-field-chart-item-song'],
    artist: ['.views-field-field-chart-item-artist']
  }])(function(err, title) {
    console.log(title);
  })
})

if (isProduction) {
  const bundle = require('./compiler/compiler.js')
  bundle()
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    })
  })
};

proxy.on('error', (e) => console.log('Could not connect to proxy, please try again...'));

app.listen(port, () => console.log('Server running on port ' + port));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb')
});