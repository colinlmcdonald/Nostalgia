import { combineReducers }  from 'redux';
import { profile }          from './reducerProfile';
import { routes }           from './reducerRoutes';

export default combineReducers({
  Profile: profile,
  Routes: routes
})

