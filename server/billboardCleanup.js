'use strict'
var Promise = require('bluebird');

module.exports = {
  billboardCleanup(data, year, res) {
    const matches = [];
    const songs = data[0].songs;
    const artists = data[0].artists;
    let artist;
    songs.forEach((song, i) => {
      song = song.trim();
      artist = artists[i].trim();
      matches.push({
        song: song,
        artist: artist
      });
    });
    this.fetchSpotify(matches, year)
      .then(songs => res.send(songs))
      .catch(err => throw err)
  },

  fetchSpotify(billboard, year) {
    let song, artist;
    return Promise.map(billboard, (val) => {
      song = val.song.replace(/[\s]/g, '%20');
      artist = val.artist.replace(/[\s]/g, '%20');
      return fetch(`https://api.spotify.com/v1/search?q=${song}%20artist:${artist}%20year:${year}&type=track`)
        .then(response => response.json())
        .then(song => song)
    });
  }
};