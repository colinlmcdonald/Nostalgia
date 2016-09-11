import React              from 'react';
import { PlayButton }     from './PlayButton';
import { PlusButton }     from './PlusButton';

export const Track = ({track, i, handleSongPlaylist, handleSongPlay, currentSong}) => (
  <div className='row'>
    <div className='song-container'>
      <div className='song-name-album-container' onClick={() => handleSongPlaylist(track, i)}>
        <p className='artist-song'>{track.song}</p>
        <p className='artist'>{track.artist}</p>
      </div>
      <PlusButton track={track} i={i} handleSongPlaylist={handleSongPlaylist} />
      <PlayButton track={track} i={i} handleSongPlay={handleSongPlay} currentSong={currentSong}/>
    </div>
  </div>
)