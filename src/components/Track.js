import React from 'react'

export const Track = ({track, i, addSong}) => (
  <tr onClick={() => addSong(track, i)}>
    <td className='artist'>{track.artist}</td>
    <td>{track.song}</td>
  </tr>
)