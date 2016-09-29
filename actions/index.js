import { 
  playSong, pauseSong
}                                   from './actionMusicPlayer';

import {
  generatePlaylist, 
  createSpotifyPlaylist, 
  checkIfSongsOnSpotify, 
  addSong, 
  removeSong
}                                   from './actionPlaylist';

import {
  getProfileInfo,
  submitBirthday
}                                   from './actionProfile';

import { setCurrentRoute }          from './actionRouting';


export const actions = {
  playSong,
  pauseSong,
  generatePlaylist,
  createSpotifyPlaylist,
  checkIfSongsOnSpotify,
  addSong,
  removeSong,
  getProfileInfo,
  submitBirthday,
  setCurrentRoute
}