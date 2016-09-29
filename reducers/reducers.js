import { combineReducers }  from 'redux';
import { profile }          from './reducerProfile';
import { routes }           from './reducerRoutes';
import { playlist }         from './reducerPlaylist';

export default combineReducers({
  Profile: profile,
  Routes: routes,
  Playlist: playlist
})

