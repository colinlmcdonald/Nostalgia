import update           from 'react-addons-update'
import * as constants   from '../constants/index'

export function profile(state = {
  name: '',
  image: '',
  id: '',
  birthday: '',
  allSongs: [],
  unusedSongs: [],
  usedSongs: [],
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
      return randomPlaylist(state, action.payload)
    case constants.REPLACE_TRACK:
      return replaceSong(state, action.payload, action.i)
    default:
      return state
  }
}

export function randomPlaylist(state, songs) {
  const playlist = [];
  let song;

  for (var i = 0; i <= 10; i++) {
    song = songs.splice(Math.floor(Math.random() * songs.length), 1);
    playlist.push(song[0]);
  }
  return Object.assign({}, state, {
    allSongs: [],
    unusedSongs: songs,
    usedSongs: [],
    playlist
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
