import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks, handleSongPlay, handleSongPlaylist, song}) => (
  <div className='container'>
    {tracks.map((track, i) => (
      <Track track={track} key={i} i={i} handleSongPlay={handleSongPlay} handleSongPlaylist={handleSongPlaylist} song={song}/>
    ))}
  </div>
)