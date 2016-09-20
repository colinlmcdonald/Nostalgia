import React                  from 'react';
import { BirthdayView }       from './components/BirthdayView';
import { PlaylistView }       from './components/PlaylistView';

export const router = (props, handleSongPlay, handleSongPlaylist) =>  {
  if (props.currentRoute === 'BirthdayView') {
    return <BirthdayView {...props} />
  } else {
    return <PlaylistView {...props} handleSongPlay={handleSongPlay} handleSongPlaylist={handleSongPlaylist} />
  }
}