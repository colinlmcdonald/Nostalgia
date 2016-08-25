import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';

import { NavBar }             from './NavBar';
import { Playlist }           from './Playlist';
import { BirthdayDisplay }    from './BirthdayDisplay';
import { BirthdayForm }       from './BirthdayForm';

export class App extends Component {
  constructor(props) {
    super(props)
    this.removeSong = this.removeSong.bind(this)
    this.addSong = this.addSong.bind(this)
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
    this.props.dispatch(actions.replaceTrack(song, i));
  }

  addSong(song) {
    this.props.dispatch(actions.addSong(song));
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

  createPlaylist() {
    const { dispatch, playlist } = this.props
    dispatch(actions.createPlaylist(playlist))
  }

  render() {
    const {image, name, playlist, birthday, allSongs} = this.props
    console.log(playlist);
    return (
      <div>
        <NavBar />
        <h2>{name}</h2>
        <img src={image} />
        {birthday ? <BirthdayDisplay birthday={birthday} convertDay={this.convertDay} /> : <BirthdayForm handleSubmit={this.handleSubmit} />}
        <button onClick={() => this.handleHighSchool()}>Highschool</button>
        <button onClick={() => this.handleMiddleSchool()}>Middleschool</button>
        <Playlist tracks={allSongs} addSong={this.addSong}/>
        <Playlist tracks={playlist} />
        <button onClick={() => this.createPlaylist()}>Create Playlist</button>
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
  const allSongs = state.Profile.allSongs;
  return {
    name,
    image,
    id,
    birthday,
    allSongs,
    playlist
  }
};

export default connect(mapStateToProps)(App)