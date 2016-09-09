import update           from 'react-addons-update'
import * as constants   from '../constants/index'

export function profile(state = {
  name: '',
  image: '',
  id: '',
  birthday: '',
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
        playlist: update(state.playlist, {$push: [action.payload]})
      })
    default:
      return state
  }
}

export function applySpotify(state, spotifySongs) {
  const matches = [];
  let song, re, re2;
  let flag = false;
  for (let i = 0; i < state.allSongs.length; i++) {
    for (let j = 0; j < spotifySongs.length; j++) {
      re = new RegExp(spotifySongs[j].tracks.items[0].name, 'g');
      re2 = new RegExp(state.allSongs[i].song, 'g');
      if (re.test(state.allSongs[i].song) || re2.test(spotifySongs[j].tracks.items[0].name)) {
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
    allSongs: matches
  })
}

export function replaceSong(state, song, i) {
  const { unusedSongs, playlist, usedSongs } = state;
  const index = Math.floor(Math.random() * unusedSongs.length);
  const randomSong = unusedSongs[index];
  let newUnusedSongs = update(unusedSongs, {$splice: [[index, 1]]});
  const oldSong = playlist.slice(i, 1);
  const newPlaylist = update(playlist, {$splice: [[i, 1, randomSong]]});
  let newUsedSongs = update(usedSongs, {$push: oldSong});

  if (!newUnusedSongs.length) {
    newUnusedSongs = newUsedSongs;
    newUsedSongs = [];
  }

  return Object.assign({}, state, {
    unusedSongs: newUnusedSongs,
    playlist: newPlaylist,
    usedSongs: newUsedSongs
  })

}
