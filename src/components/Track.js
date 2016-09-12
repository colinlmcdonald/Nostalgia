import React              from 'react';
import { PlayButton }     from './PlayButton';
import { PlusButton }     from './PlusButton';
import Spinner            from 'react-spinner';

export const Track = ({track, i, handleSongPlaylist, handleSongPlay, currentSong, spotify}) => (
  <div className='row'>
    <div className='song-container'>
      <div className='song-name-album-container' onClick={() => handleSongPlaylist(track, i)}>
        <p className='artist-song'>{track.song}</p>
        <p className='artist'>{track.artist}</p>
      </div>
      <div style={track.name ? {width: 'auto', opacity: 1} : null} className='buttons-container'>
      <PlayButton track={track} i={i} handleSongPlay={handleSongPlay} currentSong={currentSong}/>
      <PlusButton track={track} i={i} handleSongPlaylist={handleSongPlaylist} />
      </div> 
      {!spotify ? <div className='spinner-container'><Spinner /></div> : null}
    </div>
  </div>
)