import React from 'react'

export const PlusButton = ({track, i, handleSongPlaylist}) => (
  <div className='plus-button-container' onClick={() => handleSongPlaylist(track, i)}>
    {track.inPlaylist ? <i className='fa fa-check show'></i>
    : <i className={track.name ? 'fa fa-plus show' : 'fa fa-plus'}></i>}
  </div>
)