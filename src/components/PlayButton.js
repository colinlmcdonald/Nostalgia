import React from 'react'

export const PlayButton = ({track, i, handleSongPlay, currentSong}) => (
  <div onClick={() => handleSongPlay(track, i)}>
    {track.isPlaying && currentSong === track.preview_url ? <i className='fa fa-pause-circle show'></i>
    : <i className={track.name ? 'fa fa-play-circle show' : 'fa fa-play-circle'}></i>}
  </div>
)