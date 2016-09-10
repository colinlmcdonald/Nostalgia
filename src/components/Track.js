import React              from 'react';
import { PlayButton }     from './PlayButton';
import { PlusButton }     from './PlusButton';

export const Track = ({track, i, handleSongPlaylist, handleSongPlay, song}) => (
  <div className='row'>
    <div className='song-container'>
      <p className='artist-song-number'>{i + 1}</p>
      <div className='song-name-album-container'>
        <p className='artist-song'>{track.song}</p>
        <p className='artist'>{track.artist}</p>
      </div>
      {track.preview_url ? <PlayButton track={track} i={i} handleSongPlay={handleSongPlay} song={song}/> : null}
      {track.name ? <PlusButton track={track} i={i} handleSongPlaylist={handleSongPlaylist} /> : null}
    </div>
  </div>
)