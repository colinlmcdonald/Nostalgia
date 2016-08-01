import React from 'react'

export const Track = ({track, i, removeSong}) => (
  <div onClick={() => removeSong(track, i)}>
    <span className='artist'>{track.artist}</span> - {track.song}
  </div>
)