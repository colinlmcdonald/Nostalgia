import React     from 'react'
import { Track } from './Track'

export const Playlist = ({tracks, handleSongPlay, handleSongPlaylist, currentSong, spotify}) => (
  <div className='container'>
    {tracks.map((track, i) => (
      <div className='col-sm-4' key={i}>
        <Track track={track} i={i} handleSongPlay={handleSongPlay} handleSongPlaylist={handleSongPlaylist} currentSong={currentSong} spotify={spotify}/>
      </div>
    ))}
  </div>
)