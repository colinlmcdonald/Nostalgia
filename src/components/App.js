import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import { spotifyLogin }       from '../../actions/actions'

export class App extends Component {
  
  login() {
    this.props.dispatch(spotifyLogin());
  }

  render() {
    return (
      <div>
        <button onClick={() => this.login()}> Login </button>
      </div>
    )
  }
}

function mapStateToProps(state) {

};

export default connect(mapStateToProps)(App)