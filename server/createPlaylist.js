'use strict'
var Promise = require('bluebird');

module.exports = {
  billboardCleanup(data) {
    const matches = {};
    const songs = data[0].songs;
    const artists = data[0].artists;
    let artist;
    songs.forEach((song, i) => {
      song = song.trim();
      artist = artists[i].trim();
      matches[song] = artist;
    });
    return matches
  },

  fetchSpotify(billboard, year) {
    let song, artist;
    return Promise.map(billboard, (val) => {
      song = encodeURI(val.song);
      artist = encodeURI(val.artist);
      return fetch(`https://api.spotify.com/v1/search?q=${song}%20artist:${artist}%20year:${year}&type=track`)
        .then(response => response.json())
        .then(song => song)
    })
  }
};