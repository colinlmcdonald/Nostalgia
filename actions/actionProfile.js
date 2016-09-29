import * as constants from '../constants/index';
import { actions }    from './index';

export function getProfileInfo(id) {
  return dispatch => {
    return fetch(`/user/${id}/profile`)
      .then(res => res.json())
      .then(json => {
        if (json.birthday) {
          dispatch(actions.setCurrentRoute('PlaylistView'))
          dispatch(actions.generatePlaylist(json.birthday.year))
        } else {
          dispatch(actions.setCurrentRoute('BirthdayView'))
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
    return fetch(`/user/${id}/birthday`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bday)
    })
    .then(res => res.json())
    .then(json => {
      dispatch(getProfileInfo(id))
      dispatch(processBirthday(json))
    })
  }
}

export function processBirthday(payload) {
  return {
    type: constants.PROCESS_BIRTHDAY,
    payload
  }
}