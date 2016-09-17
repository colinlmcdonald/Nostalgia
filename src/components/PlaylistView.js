import React                  from 'react';
import { Playlist }           from './Playlist';
import ReactAudioPlayer       from './ReactAudioPlayer';

export const PlaylistView = ({allSongs, currentSong, spotify, pause, play}) => (
  <div>
    {console.log('sup mellow')}
    <button className='btn' onClick={() => handleHighSchool()}>Highschool</button>
    <button className='btn' onClick={() => handleMiddleSchool()}>Middleschool</button>
  </div>
)
    // <div className='container'>
    //   <div className='row'>
    //     <div className='col-md-12'>
    //       <Playlist tracks={allSongs} handleSongPlaylist={this.handleSongPlaylist} handleSongPlay={this.handleSongPlay} currentSong={currentSong} spotify={spotify}/>
    //     </div>
    //   </div>
    // </div>
    // {/* TODO: Create playlist button */}
    // <button onClick={() => this.createPlaylist()}>Create Playlist</button>
    // <div id='player'>
    //   <ReactAudioPlayer src={currentSong} autoPlay='false' pause={pause} play={play}/>
    // </div>