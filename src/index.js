import React                        from 'react';
import { render }                   from 'react-dom';
import { 
  createStore, 
  applyMiddleware 
}                                   from 'redux';
import { browserHistory }           from 'react-router';
import thunk                        from 'redux-thunk';

import Root                         from './root';
import rootReducer                  from '../reducers/reducers';

import 'isomorphic-fetch';
import '../public/styles/main.css';
import '../public/styles/react-spinner.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
const history = browserHistory;

render(
  <Root store={store} history={history}/>, 
  document.getElementById('app')
);