import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks, removeSong}) => (
  <div>
    {tracks.map((track, i) => (
      <Track track={track} key={i} i={i} removeSong={removeSong}/>
    ))}
  </div>
)