import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks, handleSongPlay, handleSongPlaylist, currentSong, spotify}) => (
  <div className='flex-container'>
    {tracks.map((track, i) => (
      <Track track={track} key={i} i={i} handleSongPlay={handleSongPlay} handleSongPlaylist={handleSongPlaylist} currentSong={currentSong} spotify={spotify}/>
    ))}
  </div>
)