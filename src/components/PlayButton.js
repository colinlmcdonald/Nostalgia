import React from 'react'

export const PlayButton = ({track, i, handleSongPlay, song}) => (
  <div onClick={() => handleSongPlay(track, i)}>
    {track.isPlaying && song === track.preview_url ? <i className='fa fa-pause-circle'></i>
    : <i className='fa fa-play-circle'></i>}
  </div>
)