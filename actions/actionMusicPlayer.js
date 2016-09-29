import * as constants from '../constants/index';


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