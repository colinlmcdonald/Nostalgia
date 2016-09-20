import React                  from 'react';
import { Playlist }           from './Playlist';
import ReactAudioPlayer       from './ReactAudioPlayer';

export const PlaylistView = ({allSongs, currentSong, spotify, pause, play, handleHighSchool, handleSongPlaylist, handleSongPlay, createSelectedPlaylist, createAllSongsPlaylist}) => (
  <div>
    <div className='container'>
      <div className='row'>
        <div className='col-md-4 offset-md-2'>
          <button onClick={(e) => createSelectedPlaylist(e)}>Add Selected Songs</button>
        </div>
        <div className='col-md-4'>
          <button onClick={(e) => createAllSongsPlaylist(e)}>Add All Songs</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <Playlist tracks={allSongs} handleSongPlaylist={handleSongPlaylist} handleSongPlay={handleSongPlay} currentSong={currentSong} spotify={spotify}/>
        </div>
      </div>
    </div>
    <div id='player'>
      <ReactAudioPlayer src={currentSong} autoPlay='false' pause={pause} play={play}/>
    </div>
  </div>
)