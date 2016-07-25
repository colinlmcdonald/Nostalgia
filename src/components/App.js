import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions'

export class App extends Component {
  
  componentDidMount() {
    const { params, dispatch } = this.props;
    const id = params.id;
    dispatch(actions.getProfileInfo(id));
  }

  handleSubmit(e) {
    const { dispatch, id } = this.props;
    e.preventDefault();
    const form = e.target;
    const bday = form.querySelector('[name=birthday]').value.split('-');
    dispatch(actions.submitBirthday(bday, id));
  }

  handleHighSchool() {
    
  }

  render() {
    const {image, name} = this.props
    return (
      <div>
        <h2>{name}</h2>
        <img src={image} />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input name='birthday' type='date'/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const name = state.Profile.name;
  const image = state.Profile.image;
  const id = state.Profile.id;
  const birthday = state.Profile.birthday;
  return {
    name,
    image,
    id,
    birthday
  }
};

export default connect(mapStateToProps)(App)