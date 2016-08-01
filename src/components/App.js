import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';
import { Playlist }           from './Playlist';
import { BirthdayDisplay }    from './BirthdayDisplay';
import { BirthdayForm }       from './BirthdayForm';

export class App extends Component {
  constructor(props) {
    super(props)
    this.removeSong = this.removeSong.bind(this)
  }
  
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

  removeSong(song, i) {
    this.props.dispatch(actions.replaceTrack(song, i))
  }

  handleHighSchool() {
    const { dispatch, birthday, id } = this.props;
    const start = parseInt(birthday.year) + 14;
    const highschool = [];
    for (var i = start; i < start + 4; i++) {
      highschool.push(i);
    };
    dispatch(actions.getSchoolPlaylist(highschool, id));
  }

  handleMiddleSchool() {
    const { dispatch, birthday, id } = this.props;
    const start = parseInt(birthday.year) + 12;
    const middleschool = [];
    for (var i = start; i < start + 4; i++) {
      middleschool.push(i);
    };
    dispatch(actions.getSchoolPlaylist(middleschool, id));
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
        <Playlist tracks={playlist} removeSong={this.removeSong}/>
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