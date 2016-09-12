'use strict';

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

  longestTwoWords(song) {
    var temp, words = song.split(' ');
    var one = '';
    var two = '';
    words.forEach(word => {
      if (word.length > two.length) {
        if (word.length > one.length) {
          temp = one;
          one = word;
          two = temp;
        } else {
          two = word;
        }
      }
    })
    return one + ' ' + two;
  },

  removeFeaturing(artist) {
    var temp = artist.split(' ');
    var result = [];

    temp.forEach((word, i) => {
      if (word !== 'featuring' && word !== 'Featuring') {
        result.push(word)
      } else {
        temp.splice(i, temp.length)
      }
    })

    return result.join(' ');
  },

  fetchSpotify(billboard) {
    let song, artist;
    return Promise.map(billboard, (val) => {
      song = encodeURI(this.longestTwoWords(val.song));
      artist = encodeURI(this.removeFeaturing(val.artist));
      return fetch(`https://api.spotify.com/v1/search?q=${song}%20artist:${artist}&type=track`)
        .then(response => response.json())
        .then(song => song)
    })
  }
};