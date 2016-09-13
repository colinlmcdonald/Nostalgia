'use strict';
var update = require('react-addons-update')

module.exports = {
  applySpotify: function(state, spotifySongs, testing) {
    const matches = [];
    let song, billboardSong, spotifySong, billboardArtist, spotifyArtist, songName;
    let flag = false;
    for (let i = 0; i < state.allSongs.length; i++) {
      for (let j = 0; j < spotifySongs.length; j++) {
        if (this.testSongMatches(state.allSongs[i], spotifySongs[j].tracks.items)) {
          song = update(state.allSongs[i], {$merge: spotifySongs[j].tracks.items[0]});
          matches.push(song);
          flag = true;
        } 
      }
      if (flag) {
        flag = false;
      } else {
        matches.push(state.allSongs[i]);
      }
    }
    return matches;
  },

  testArtistMatches: function(a1, a2) {
    if (!a1) a1 = '';
    if (!a2) a2 = '';
    var newA1 = a1.replace(/\W+/g, '');
    var newA2 = a2.replace(/\W+/g, '');
    var re = new RegExp(newA1);
    var re2 = new RegExp(newA2);
    return newA1.match(re2) || newA2.match(re) ? true : false
  },

  testSongMatches: function(bbSong, spotifyOptions) {
    var storage = {};
    for (var i = 0; i < spotifyOptions.length; i++) {
      if (this.testArtistMatches(bbSong.artist, spotifyOptions[i].artists[0].name) && this.songWithMostWordMatches(bbSong.song, spotifyOptions[i].name)) {
        return true;
      }
    }
    return false;
  },

  songWithMostWordMatches(s1, s2) {
    if (s1 === s2) {
      return true;
    }

    var x = s1.split(' ');
    var y = s2.split(' ');

    var count = 0;

    for (var i = 0; i < x.length; i++) {
      for (var j = 0; j < y.length; j++) {
        if (x[i] === y[j]) {
          count++
        }
      }
    }

    if (count > 1) {
      return count;
    } else {
      return false;
    }
  }
}
