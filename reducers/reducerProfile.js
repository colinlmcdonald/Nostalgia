import * as constants from '../constants/index'

export function profile(state = {
  name: '',
  image: '',
  id: '',
  birthday: ''
}, action) {
  switch(action.type) {
    case constants.SPOTIFY_LOGIN:
      return Object.assign({}, state, {
        name: action.payload.display_name,
        image: action.payload.images[0].url,
        id: action.payload.id
      })
    case constants.PROCESS_BIRTHDAY:
      return Object.assign({}, state, {
        birthday: action.payload
      })
    default:
      return state
  }
}
