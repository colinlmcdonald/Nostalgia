import React, { Component }   from 'react';
import { render }             from 'react-dom';
import { Link }               from 'react-router';
import { connect }            from 'react-redux';

import * as actions           from '../../actions/actions';

import { NavBar }             from './NavBar';
import { Router }             from '../router';

//TODO: Birthday displays weird after submitting and this is the url that displays after: http://localhost:3000/user/1254018841?birthday=1987-10-25
//TODO: ReactAudioPlayer.js:146 Uncaught (in promise) DOMException: The element has no supported sources.
//TODO: Outkast - Hey Ya & The Way You Move are matching for some reason
//TODO: Add browser's back button functionality
//TODO: Remove react-router
//TODO: Add D3 graph to show how song's popularity has changed

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleSongPlay = this.handleSongPlay.bind(this);
    this.handleSongPlaylist = this.handleSongPlaylist.bind(this);
    this.handleBirthdaySubmit = this.handleBirthdaySubmit.bind(this);
    this.createSelectedPlaylist = this.createSelectedPlaylist.bind(this);
    this.createAllSongsPlaylist = this.createAllSongsPlaylist.bind(this);
  }
  
  componentDidMount() {
    const { params, dispatch } = this.props;
    const id = params.id;
    dispatch(actions.getProfileInfo(id));
  }

  handleBirthdaySubmit(e) {
    const { dispatch, id } = this.props;
    e.preventDefault();
    const form = e.target;
    const bday = form.querySelector('[name=birthday]').value.split('-');
    dispatch(actions.submitBirthday(bday, id));
  }

  handleSongPlaylist(song, i) {
    const { dispatch } = this.props;
    if (song.inPlaylist) {
      dispatch(actions.removeSong(song, i));
    } else {
      dispatch(actions.addSong(song, i));
    }
  }

  handleSongPlay(song, i) {
    const { dispatch, currentSong, pause, play } = this.props;
    if (song.preview_url === currentSong && play === true) {
      dispatch(actions.pauseSong(song, i));
    } else {
      dispatch(actions.playSong(song, i));
    }
  }

  createSelectedPlaylist(e) {
    e.preventDefault();
    const { dispatch, playlist, id } = this.props;
    dispatch(actions.createPlaylist(playlist, id));
  }

  createAllSongsPlaylist(e) {
    e.preventDefault();
    const { dispatch, allSongs, id } = this.props;
    dispatch(actions.createPlaylist(allSongs, id));
  }

  render() {
    const {playlistPending, playlistSuccess, currentRoute, image, name, playlist, birthday, allSongs, currentSong, pause, play, spotify} = this.props
    return (
      <div>
        <NavBar />  
        <Router {...this.props} handleSongPlay={this.handleSongPlay} handleSongPlaylist={this.handleSongPlaylist} handleBirthdaySubmit={this.handleBirthdaySubmit} createAllSongsPlaylist={this.createAllSongsPlaylist} createSelectedPlaylist={this.createSelectedPlaylist}/>
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
  const playlistSuccess = state.Profile.playlistSuccess;
  const playlistPending = state.Profile.playlistPending;
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
    currentRoute,
    playlistSuccess,
    playlistPending
  }
};

export default connect(mapStateToProps)(App)