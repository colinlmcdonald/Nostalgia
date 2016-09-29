import * as constants from '../constants/index';

export function setCurrentRoute(payload) {
  return {
    type: constants.CHANGE_ROUTE,
    payload
  }
}