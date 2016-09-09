import React from 'react'

export const Track = ({track, i, addSong}) => (
  <div className='row' onClick={() => addSong(track, i)}>
    <div className='col-md-6 container'>
      <div className='row'>
        <div className='col-md-6'>{track.artist}</div>
        <div className='col-md-6'>{track.song}</div>
      </div>
    </div>
  </div>
)