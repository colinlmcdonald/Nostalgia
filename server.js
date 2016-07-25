'use strict'

const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const querystring = require('querystring');
const publicPath = path.resolve(__dirname, 'public');
const config = require('./config.js');
const fetch = require('isomorphic-fetch');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

const app = express();

app.use(express.static(publicPath));

const client_id = config.CLIENT_ID;
const redirect_uri = config.REDIRECT_URI;
const client_secret = config.SECRET;

app.get('/login', function(req, res) {
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }))

});

app.get('/callback', function(req, res) {
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

if (isProduction) {
  const bundle = require('./compiler/compiler.js')
  bundle()
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    })
  })
};

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...')
});

app.listen(port, function () {
  console.log('Server running on port ' + port)
});

