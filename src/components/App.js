import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';

import { NavBar }             from './NavBar';
import { router }              from '../router';

//TODO: Birthday displays weird after submitting and this is the url that displays after: http://localhost:3000/user/1254018841?birthday=1987-10-25
//TODO: ReactAudioPlayer.js:146 Uncaught (in promise) DOMException: The element has no supported sources.
//TODO: Outkast - Hey Ya & The Way You Move are matching for some reason

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleSongPlay = this.handleSongPlay.bind(this);
    this.handleSongPlaylist = this.handleSongPlaylist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  createPlaylist() {
    const { dispatch, playlist } = this.props
    dispatch(actions.createPlaylist(playlist))
  }

  render() {
    const {currentRoute, image, name, playlist, birthday, allSongs, currentSong, pause, play, spotify} = this.props
    return (
      <div>
        <NavBar />  
        {router({...this.props}, this.handleSongPlay, this.handleSongPlaylist, this.handleMiddleSchool)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const currentRoute = state.Routes.currentRoute;
  const name = state.Profile.name;
  const image = state.Profile.image;
  const id = state.Profile.id;
  const birthday = state.Profile.birthday;
  const playlist = state.Profile.playlist;
  const allSongs = state.Profile.allSongs;
  const currentSong = state.Profile.currentSong;
  const pause = state.Profile.pause;
  const play = state.Profile.play;
  const spotify = state.Profile.spotify;
  return {
    name,
    image,
    id,
    birthday,
    allSongs,
    playlist,
    currentSong,
    pause,
    play,
    spotify,
    currentRoute
  }
};

export default connect(mapStateToProps)(App)