import React              from 'react';
import { PlayButton }     from './PlayButton';
import { PlusButton }     from './PlusButton';
import Spinner            from 'react-spinner';

export const Track = ({track, i, handleSongPlaylist, handleSongPlay, currentSong, spotify}) => (
    <div className='song-container'>
      <div className='song-name-album-container' onClick={() => handleSongPlaylist(track, i)}>
        <p className='artist-song'>{track.song}</p>
        <p className='artist'>{track.artist}</p>
      </div>
      {track.album ? 
        <div className='album-img'>
          <img src={track.album.images[1].url} /> 
            <PlusButton track={track} i={i} handleSongPlaylist={handleSongPlaylist} />
        </div>
        : null}
    </div>
)
      // <div style={track.name ? {width: 'auto', opacity: 1} : null} className='buttons-container'>
      // <PlayButton track={track} i={i} handleSongPlay={handleSongPlay} currentSong={currentSong}/>
      // </div> 
      // {!spotify ? <div className='spinner-container'><Spinner /></div> : null}