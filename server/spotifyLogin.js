'use strict';

const querystring   = require('querystring');
const config        = require('../config.js');
const User          = require('../db/User.model.js');

const client_id     = config.CLIENT_ID;
const redirect_uri  = config.REDIRECT_URI;
const client_secret = config.SECRET;

module.exports = {
  fetchSpotifyAccessToken(code) {
    return fetch('https://accounts.spotify.com/api/token?' + querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      }
    });
  },

  fetchSpotifyUser(token) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  saveSpotifyUser(id, access_token, refresh_token, res) {
    User.findOne({id: id}, (err, user) => {
      if (user) {
        user.access_token = access_token;
        user.refresh_token = refresh_token;
        user.save(() => res.redirect('/user/' + user.id));
      } else {
        user = new User({
          id: id,
          access_token: access_token,
          refresh_token: refresh_token
        });
        user.save(() => res.redirect('/user/' + id))
      }
    });
  },

  updateAccessToken(user) {
    return fetch('https://accounts.spotify.com/api/token?' + querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: user.refresh_token
      
    }), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      }
    })
    .then(res => res.json())
    .then(json => {
      user.access_token = json.access_token;
      user.save();
      return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log('sup inside updateAccessToken');
        json.birthday = user.birthday;
        return json;
      })
    });
  }

}