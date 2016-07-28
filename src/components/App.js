import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';
import { Playlist }           from './Playlist';
import { BirthdayDisplay }    from './BirthdayDisplay';
import { BirthdayForm }       from './BirthdayForm';

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
    const { dispatch, birthday } = this.props;
    const highschool = parseInt(birthday.year) + 14;
    dispatch(actions.getSchoolPlaylist(highschool));
  }

  handleMiddleSchool() {
    const { dispatch, birthday } = this.props;
    const middleschool = parseInt(birthday.year) + 12;
    dispatch(actions.getSchoolPlaylist(middleschool));
  }

  render() {
    const {image, name, playlist, birthday} = this.props
    console.log(playlist);
    return (
      <div>
        <h2>{name}</h2>
        <img src={image} />
        {birthday ? <BirthdayDisplay birthday={birthday} /> : <BirthdayForm handleSubmit={this.handleSubmit} />}
        <button onClick={() => this.handleHighSchool()}>Highschool</button>
        <button onClick={() => this.handleMiddleSchool()}>Middleschool</button>
        <Playlist tracks={playlist} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const name = state.Profile.name;
  const image = state.Profile.image;
  const id = state.Profile.id;
  const birthday = state.Profile.birthday;
  const playlist = state.Profile.playlist;
  return {
    name,
    image,
    id,
    birthday,
    playlist
  }
};

export default connect(mapStateToProps)(App)