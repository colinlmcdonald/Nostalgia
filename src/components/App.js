import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';

import { NavBar }             from './NavBar';
import { Playlist }           from './Playlist';
import { BirthdayDisplay }    from './BirthdayDisplay';
import { BirthdayForm }       from './BirthdayForm';
import ReactAudioPlayer       from './ReactAudioPlayer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleSongPlay = this.handleSongPlay.bind(this);
    this.handleSongPlaylist = this.handleSongPlaylist.bind(this);
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

  handleSongPlaylist(song, i) {
    const { dispatch } = this.props;
    if (song.inPlaylist) {
      dispatch(actions.removeSong(song, i))
    } else {
      dispatch(actions.addSong(song, i))
    }
  }

  handleSongPlay(song, i) {
    const { dispatch, currentSong, pause, play } = this.props;
    if (song.preview_url === currentSong && play === true) {
      dispatch(actions.pauseSong(song, i))
    } else {
      dispatch(actions.playSong(song, i))
    }
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
    const {image, name, playlist, birthday, allSongs, currentSong, pause, play} = this.props
    return (
      <div>
        <NavBar />
        <h2>{name}</h2>
        <img src={image} />
        {birthday ? <BirthdayDisplay birthday={birthday} convertDay={this.convertDay} /> : <BirthdayForm handleSubmit={this.handleSubmit} />}
        <button onClick={() => this.handleHighSchool()}>Highschool</button>
        <button onClick={() => this.handleMiddleSchool()}>Middleschool</button>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Playlist tracks={allSongs} handleSongPlaylist={this.handleSongPlaylist} handleSongPlay={this.handleSongPlay} currentSong={currentSong}/>
            </div>
          </div>
        </div>
        {/* TODO: Create playlist button */}
        <button onClick={() => this.createPlaylist()}>Create Playlist</button>
        <div id='player'>
          <ReactAudioPlayer src={currentSong} autoPlay='false' pause={pause} play={play}/>
        </div>
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
  const currentSong = state.Profile.currentSong;
  const pause = state.Profile.pause;
  const play = state.Profile.play;
  return {
    name,
    image,
    id,
    birthday,
    allSongs,
    playlist,
    currentSong,
    pause,
    play
  }
};

export default connect(mapStateToProps)(App)