import update           from 'react-addons-update';
import * as constants   from '../constants/index';
import * as combine     from './combineSongLists';

export function playlist(state = {
  currentSong: '',
  play: false,
  pause: false,
  spotify: false,
  playlistPending: false,
  playlistSuccess: false,
  allSongs: [],
  playlist: []
}, action) {
  switch(action.type) {
    case constants.RECEIVE_SCHOOL:
      return Object.assign({}, state, {
        allSongs: action.payload
      });
    case constants.SPOTIFY_CHECK:
      return combine.applySpotify(state, action.payload, action.original);
    case constants.ADD_SONG:
      return Object.assign({}, state, {
        playlist: update(state.playlist, {$push: [action.payload]}),
        allSongs: update(state.allSongs, {$splice: [[action.i, 1, action.payload]]})
      });
    case constants.REMOVE_SONG:
      return Object.assign({}, state, {
        playlist: update(state.playlist, {$splice: [[action.i, 1]]}),
        allSongs: update(state.allSongs, {$splice: [[action.i, 1, action.payload]]})
      });
    case constants.PLAY_SONG:
      return Object.assign({}, state, {
        currentSong: action.payload.preview_url,
        play: true,
        pause: false,
        allSongs: update(state.allSongs, {[action.i]: {isPlaying: {$set: true}}})
      });
    case constants.PAUSE_SONG:
      return Object.assign({}, state, {
        play: false,
        pause: true,
        allSongs: update(state.allSongs, {[action.i]: {isPlaying: {$set: false}}})
      });
    case constants.CREATE_PLAYLIST_SUCCESS:
      return Object.assign({}, state, {
        playlistSuccess: true,
        playlistPending: false
      })
    case constants.CREATE_PLAYLIST_PENDING:
      return Object.assign({}, state, {
        playlistSuccess: false,
        playlistPending: true
      })
    default:
      return state
  };
};
