import React                  from 'react';
import { BirthdayView }       from './components/BirthdayView';
import { PlaylistView }       from './components/PlaylistView';

export default function router(props) {
  if (props.currentRoute === 'BirthdayView') {
    return <BirthdayView {...props} />
  } else {
    return <PlaylistView {...props} />
  }
}