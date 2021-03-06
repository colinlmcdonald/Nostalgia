import * as constants   from '../constants/index'

export function routes (state = {
  currentRoute: ''
}, action) {
  switch(action.type) {
    case constants.CHANGE_ROUTE: {
      return Object.assign({}, state, {
        currentRoute: action.payload
      });
    };
    default: {
      return state;
    };
  };
};