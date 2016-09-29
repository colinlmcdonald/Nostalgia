import * as constants from '../constants/index';

export function generatePlaylist(year) {
  return dispatch => {
    return fetch(`http://localhost:3000/generate-playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        year
      })
    })
    .then(res => res.json())
    .then(json => {
      const songs = [];
      //Payload comes back as object from server with Artists as keys and Tracks as values
      for (var key in json) {
        songs.push({
          song: key,
          artist: json[key]
        })
      }
      //Load the song list while we wait to see if they are actually on Spotify
      dispatch(checkIfSongsOnSpotify(songs, json))
      dispatch(processGeneratePlaylist(songs))
    })
  }
}

export function processGeneratePlaylist(payload) {
  return {
    type: constants.RECEIVE_SCHOOL,
    payload
  }
}

export function createSpotifyPlaylist(playlist, id) {
  return dispatch => {
    dispatch(createSpotifyPlaylistPending());
    return fetch('http://localhost:3000/create-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlist,
        id
      })
    })
    .then(res => res.json())
    .then(json => dispatch(processCreateSpotifyPlaylist()))
  }
}

export function processCreateSpotifyPlaylist() {
  return {
    type: constants.CREATE_PLAYLIST_SUCCESS
  }
}

export function createSpotifyPlaylistPending() {
  return {
    type: constants.CREATE_PLAYLIST_PENDING
  }
}

export function checkIfSongsOnSpotify(songs) {
  return dispatch => {
    return fetch('http://localhost:3000/check-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songs)
    })
    .then(res => res.json())
    .then(json => dispatch(processCheckIfSongsOnSpotify(json)))
  }
}

export function processCheckIfSongsOnSpotify(payload) {
  let tracks = payload.filter(song => {
    return song.tracks.items.length > 0
  });
  return {
    type: constants.SPOTIFY_CHECK,
    payload: tracks
  }
}

export function addSong(payload, i) {
  payload.inPlaylist = true;
  return {
    type: constants.ADD_SONG,
    payload,
    i
  }
}

export function removeSong(payload, i) {
  payload.inPlaylist = false;
  return {
    type: constants.REMOVE_SONG,
    payload,
    i
  }
}