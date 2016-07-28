import React from 'react'

export const Track = ({track}) => (
  <div>
    <span className='artist'>{track.artist}</span> - {track.song}
  </div>
)