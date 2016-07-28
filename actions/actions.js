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

export function getHighschool(year) {
  return dispatch => {
    return fetch(`http://localhost:3000/${year}`)
      .then(res => res.json())
      .then(json => dispatch(processHighschool(json)))
  }
}

export function processHighschool(payload) {
  return {
    type: constants.RECEIVE_HIGHSCHOOL,
    payload
  }
}