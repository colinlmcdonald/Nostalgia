import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'

export default (
  <Route path='/user/:id' component={App}>
  </Route>
)