import React from 'react'

export const PlusButton = ({track, i, handleSongPlaylist}) => (
  <div onClick={() => handleSongPlaylist(track, i)}>
  {track.inPlaylist ? <i className='fa fa-times'></i>
   : <i className='fa fa-plus'></i>}
  </div>
)