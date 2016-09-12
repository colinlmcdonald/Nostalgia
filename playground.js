'use strict';
var update = require('react-addons-update')

module.exports = {
  applySpotify: function(state, spotifySongs, testing) {
  const matches = [];
  let song, billboardSong, spotifySong;
  let flag = false;
  for (let i = 0; i < state.allSongs.length; i++) {
    for (let j = 0; j < spotifySongs.length; j++) {
      if (testing) {
        console.log('artistMatch: ', this.testArtistMatches(state.allSongs[i].artist, spotifySongs[j].tracks.items[0].artists[0].name));
        console.log('songMatch: ', this.testSongMatches(state.allSongs[i].song, spotifySongs[j].tracks.items[0].name));
      }
      //the problem is that I'm using the first item when really i should be looping through all items to find the one that has the closest match to the song from billboard
      if (this.testArtistMatches(state.allSongs[i].artist, spotifySongs[j].tracks.items[0].artists[0].name) && this.testSongMatches(state.allSongs[i].song, spotifySongs[j].tracks.items[0].name)) {
        song = update(state.allSongs[i], {$merge: spotifySongs[j].tracks.items[0]})
        matches.push(song)
        flag = true;
      } 
    }
    if (flag) {
      flag = false;
    } else {
      matches.push(state.allSongs[i])
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

testSongMatches: function(s1, s2) {
  if (s1 === s2) {
    return true;
  }
  console.log(s1, s2);

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
    return true;
  } else {
    return false;
  }
}
}
