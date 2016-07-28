import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks}) => (
  <div>
    {tracks.map((track, i) => (
      <Track track={track} key={i}/>
    ))}
  </div>
)