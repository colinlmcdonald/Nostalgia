import React              from 'react';
import { PlayButton }     from './PlayButton';
import { PlusButton }     from './PlusButton';
import Spinner            from 'react-spinner';
import noImage            from '../../public/images/no_image_available.jpg'

export const Track = ({track, i, handleSongPlaylist, handleSongPlay, currentSong, spotify}) => (
    <div className='song-container'>
      {track.album ? 
        <div className='album-img-container'>
          <img className='album-img' src={track.album.images[1].url} />
          <PlayButton track={track} i={i} handleSongPlay={handleSongPlay} currentSong={currentSong}/>
        </div>
        : !spotify ? 
        <div className='album-img-container'>
          <div className='spinner-container'>
            <Spinner />
          </div> 
        </div>
        : <div className='album-img-container'>
            <img className='no-image' src={noImage} />
          </div>}
      <div className='song-name-album-buttons-container'>
        <div className='song-name-album-container' onClick={() => handleSongPlaylist(track, i)}>
          <p className='artist-song'>{track.song}</p>
          <p className='artist'>{track.artist}</p>
        </div> 
        <div style={track.name ? {opacity: 1} : null} className='buttons-container'>
          <PlusButton track={track} i={i} handleSongPlaylist={handleSongPlaylist} />
        </div>
      </div>
    </div>
)