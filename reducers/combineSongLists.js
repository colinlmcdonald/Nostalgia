import update           from 'react-addons-update';

//Check to see if a song is on Spotify. If so, add the Spotify props to it so we can play a clip of the song, add it to a playlist, etc.
export function applySpotify(state, spotifySongs, testing) {
  const matches = [];
  let song, billboardSong, spotifySong, billboardArtist, spotifyArtist, songName;
  let flag = false;
  for (let i = 0; i < state.allSongs.length; i++) {
    for (let j = 0; j < spotifySongs.length; j++) {
      if (testSongMatches(state.allSongs[i], spotifySongs[j].tracks.items)) {
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
  return Object.assign({}, state, {
    allSongs: matches,
    spotify: true
  })
}

export function testArtistMatches(a1, a2) {
  if (!a1) a1 = '';
  if (!a2) a2 = '';
  var newA1 = a1.replace(/\W+/g, '');
  var newA2 = a2.replace(/\W+/g, '');
  var re = new RegExp(newA1);
  var re2 = new RegExp(newA2);
  return newA1.match(re2) || newA2.match(re) ? true : false
}

export function testSongMatches(bbSong, spotifyOptions) {
  var storage = {};
  for (var i = 0; i < spotifyOptions.length; i++) {
    if (testArtistMatches(bbSong.artist, spotifyOptions[i].artists[0].name) && songWithMostWordMatches(bbSong.song, spotifyOptions[i].name)) {
      return true;
    }
  }
  return false;
}

export function songWithMostWordMatches(s1, s2) {
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

  return count > 1 ? true : false
}