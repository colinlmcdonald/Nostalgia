import React, { Component }   from              'react';
import { Playlist }           from         './Playlist';
import ReactAudioPlayer       from './ReactAudioPlayer';
import Spinner                from      'react-spinner';

export class PlaylistView extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: false,
        allSongs: false
      };
      this.props = props;
    }

    createPlaylist(e, playlist) {
      if (playlist === 'selected') {
        this.props.createSelectedPlaylist(e)
        this.setState({
          selected: true,
          allSongs: false,
        })
      } else {
        this.props.createAllSongsPlaylist(e)
        this.setState({
          allSongs: true,
          selected: false
        })
      }
    }

    render() {
      return <div>
        <div className='container'>
          <div className='button-container row'>
            <div className='col-md-4 offset-md-2'>
              {this.props.playlistPending && this.state.selected ? 
                <div className='spinner-container'><Spinner /></div> 
                : this.state.selected && this.props.playlistSuccess ? 
                  <p className='playlist-success-msg'>Congratulations! Your playlist has saved. You can find it under 'Nostalgia Highschool'.</p> 
                  : this.state.selected && !this.props.playlistSuccess && !this.props.playlistPending ? <p className='playlist-error-msg'>Bummer! Your playlist has NOT been saved. Please try again.</p> : <button className='playlist-button' onClick={(e) => this.createPlaylist(e, 'selected')}>Add Selected Songs</button>}
            </div>
            <div className='col-md-4'>
              {this.props.playlistPending && this.state.allSongs ? 
                <div className='spinner-container'><Spinner /></div> 
                : this.state.allSongs && this.props.playlistSuccess ? 
                  <p className='playlist-success-msg'>Congratulations! Your playlist has saved. You can find it under 'Nostalgia Highschool'.</p> 
                  : this.state.allSongs && !this.props.playlistSuccess && !this.props.playlistPending ? <p className='playlist-error-msg'>Bummer! Your playlist has NOT been saved. Please try again.</p> : <button className='playlist-button' onClick={(e) => this.createPlaylist(e)}>Add All Songs</button>}
            </div>
          </div>
        </div>
        <Playlist tracks={this.props.allSongs} handleSongPlaylist={this.props.handleSongPlaylist} handleSongPlay={this.props.handleSongPlay} currentSong={this.props.currentSong} spotify={this.props.spotify}/>
        <div id='player'>
          <ReactAudioPlayer src={this.props.currentSong} autoPlay='false' pause={this.props.pause} play={this.props.play}/>
        </div>
      </div>
    }
}