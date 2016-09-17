import React                  from 'react';
import { Playlist }           from './Playlist';
import ReactAudioPlayer       from './ReactAudioPlayer';

export const PlaylistView = () => (
  <div>
    <button className='btn' onClick={() => this.handleHighSchool()}>Highschool</button>
    <button className='btn' onClick={() => this.handleMiddleSchool()}>Middleschool</button>
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <Playlist tracks={allSongs} handleSongPlaylist={this.handleSongPlaylist} handleSongPlay={this.handleSongPlay} currentSong={currentSong} spotify={spotify}/>
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