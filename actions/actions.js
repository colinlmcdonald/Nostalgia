import * as constants from '../constants/index'

export function getProfileInfo(id) {
  return dispatch => {
    return fetch(`http://localhost:3000/user/${id}/profile`)
      .then(res => res.json())
      .then(json => dispatch(processProfileInfo(json)))
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

export function getSchoolPlaylist(years) {
  return dispatch => {
    return fetch(`http://localhost:3000/generate-playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(years)
    })
    .then(res => res.json())
    .then(json => dispatch(processSchoolPlaylist(json, dispatch)))
  }
}

export function processSchoolPlaylist(payload, dispatch) {
  const songs = [];
  for (var key in payload) {
    songs.push({
      song: key,
      artist: payload[key]
    })
  }
  dispatch(checkIfSongsOnSpotify(songs, payload))
  return {
    type: constants.RECEIVE_SCHOOL,
    payload: songs
  }
}

export function replaceTrack(payload, i) {
  return {
    type: constants.REPLACE_TRACK,
    payload,
    i
  }
}

export function createPlaylist(playlist) {
  return dispatch => {
    fetch()
  }
}

export function checkIfSongsOnSpotify(songs, originalList) {
  return dispatch => {
    fetch('http://localhost:3000/check-songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songs)
    })
    .then(res => res.json())
    .then(json => dispatch(processSpotifyCheck(json, originalList)))
  }
}

export function processSpotifyCheck(payload, originalList) {
  let tracks = payload.filter(song => {
    return song.tracks.items.length > 0
  });
  return {
    type: constants.SPOTIFY_CHECK,
    payload: tracks,
    original: originalList
  }
}

export function addSong(payload) {
  return {
    type: constants.ADD_SONG,
    payload
  }
}