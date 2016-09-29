import React                  from 'react';
import { BirthdayView }       from './components/BirthdayView';
import { PlaylistView }       from './components/PlaylistView';
import Spinner                from 'react-spinner';

export const Router = (props) =>  {
  if (props.currentRoute === 'BirthdayView') {
    return <BirthdayView {...props} />
  } else {
    return props.allSongs.length ? <PlaylistView {...props} />
    : <div className='spinner-flex'>
        <div className='spinner-container'><Spinner /></div>
      </div>
  }
}