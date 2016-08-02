import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks, addSong}) => (
  <tbody>
    {tracks.map((track, i) => (
      <Track track={track} key={i} i={i} addSong={addSong}/>
    ))}
  </tbody>
)