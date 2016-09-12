import update           from 'react-addons-update'
import * as constants   from '../constants/index'

export function profile(state = {
  name: '',
  image: '',
  id: '',
  birthday: '',
  currentSong: '',
  play: false,
  pause: false,
  spotify: false,
  allSongs: [],
  playlist: []
}, action) {
  switch(action.type) {
    case constants.SPOTIFY_LOGIN:
      return Object.assign({}, state, {
        name: action.payload.display_name,
        image: action.payload.images[0].url,
        id: action.payload.id,
        birthday: action.payload.birthday ? action.payload.birthday : state.birthday
      })
    case constants.PROCESS_BIRTHDAY:
      return Object.assign({}, state, {
        birthday: action.payload
      })
    case constants.RECEIVE_SCHOOL:
      return Object.assign({}, state, {
        allSongs: action.payload
      })
    case constants.REPLACE_TRACK:
      return replaceSong(state, action.payload, action.i)
    case constants.SPOTIFY_CHECK:
      return applySpotify(state, action.payload, action.original)
    case constants.ADD_SONG:
      return Object.assign({}, state, {
        playlist: update(state.playlist, {$push: [action.payload]}),
        allSongs: update(state.allSongs, {$splice: [[action.i, 1, action.payload]]})
      })
    case constants.REMOVE_SONG:
      return Object.assign({}, state, {
        playlist: update(state.playlist, {$splice: [[action.i, 1]]}),
        allSongs: update(state.allSongs, {$splice: [[action.i, 1, action.payload]]})
      })
    case constants.PLAY_SONG:
      return Object.assign({}, state, {
        currentSong: action.payload.preview_url,
        play: true,
        pause: false,
        allSongs: update(state.allSongs, {[action.i]: {isPlaying: {$set: true}}})
      })
    case constants.PAUSE_SONG:
      return Object.assign({}, state, {
        play: false,
        pause: true,
        allSongs: update(state.allSongs, {[action.i]: {isPlaying: {$set: false}}})
      })
    default:
      return state
  }
}

//Check to see if a song is on Spotify. If so, add the Spotify props to it so we can play a clip of the song, add it to a playlist, etc.
export function applySpotify(state, spotifySongs) {
  const matches = [];
  let song, billboardSong, spotifySong;
  let flag = false;
  console.log(spotifySongs);
  for (let i = 0; i < state.allSongs.length; i++) {
    for (let j = 0; j < spotifySongs.length; j++) {
      if (testArtistMatches(state.allSongs[i].artist && spotifySongs[j].tracks.items[0].artists[0].name) && testSongMatches(state.allSongs[i].song, spotifySongs[j].tracks.items[0].name)) {
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
  return Object.assign({}, state, {
    allSongs: matches,
    spotify: true
  })
}

export function testArtistMatches(a1 = '', a2 = '') {
  var newA1 = a1.replace(/\W+/g, '');
  var newA2 = a2.replace(/\W+/g, '');
  var re = new RegExp(newA1);
  var re2 = new RegExp(newA2);
  return newA1.match(re2) || newA2.match(re) ? true : false
}

export function testSongMatches(s1, s2) {
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
