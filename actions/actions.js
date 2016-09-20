import * as constants from '../constants/index'

export function getProfileInfo(id) {
  return dispatch => {
    return fetch(`http://localhost:3000/user/${id}/profile`)
      .then(res => res.json())
      .then(json => {
        if (json.birthday) {
          dispatch(setCurrentRoute('PlaylistView'))
          dispatch(getSchoolPlaylist(json.birthday.year))
        } else {
          dispatch(setCurrentRoute('BirthdayView'))
        }
        dispatch(processProfileInfo(json))
      })
  }
};

export function processProfileInfo(payload) {
  return {
    type: constants.SPOTIFY_LOGIN,
    payload
  }
}

export function submitBirthday(bdayArr, id) {
  const bday = {
    year: bdayArr[0],
    month: bdayArr[1],
    day: bdayArr[2]
  }
  return dispatch => {
    return fetch(`http://localhost:3000/user/${id}/birthday`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bday)
    })
    .then(res => res.json())
    .then(json => dispatch(processBirthday(json)))
  }
}

export function processBirthday(payload) {
  return {
    type: constants.PROCESS_BIRTHDAY,
    payload
  }
}

export function getSchoolPlaylist(year) {
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
      dispatch(processSchoolPlaylist(songs))
    })
  }
}

export function processSchoolPlaylist(payload) {
  return {
    type: constants.RECEIVE_SCHOOL,
    payload
  }
}

export function replaceTrack(payload, i) {
  return {
    type: constants.REPLACE_TRACK,
    payload,
    i
  }
}

export function createPlaylist(playlist, id) {
  return dispatch => {
    dispatch(createPlaylistPending());
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
    .then(json => dispatch(processCreatePlaylist()))
  }
}

export function processCreatePlaylist() {
  return {
    type: constants.CREATE_PLAYLIST_SUCCESS
  }
}

export function createPlaylistPending() {
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
    .then(json => dispatch(processSpotifyCheck(json)))
  }
}

export function processSpotifyCheck(payload) {
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

export function playSong(payload, i) {
  return {
    type: constants.PLAY_SONG,
    payload,
    i
  }
}

export function pauseSong(payload, i) {
  return {
    type: constants.PAUSE_SONG,
    payload,
    i
  }
}

export function setCurrentRoute(payload) {
  return {
    type: constants.CHANGE_ROUTE,
    payload
  }
}