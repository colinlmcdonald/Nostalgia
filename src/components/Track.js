import React from 'react'

export const Track = ({track, i, addSong}) => (
  <div className='grid-row grid-row-sm' onClick={() => addSong(track, i)}>
    <div className='grid'>
      <div className='grid-row grid-row-lg'>
        <div className='grid-item track-artist'>{track.artist}</div>
        <div className='grid-item'>{track.song}</div>
      </div>
    </div>
  </div>
)