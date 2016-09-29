'use strict';

var Promise         = require('bluebird');
const Xray          = require('x-ray');
const x             = Xray();

module.exports = {

  //Set songs to an object to get rid of duplicates
  reduceBillboardSongs(songs) {
    const reducedSongs = {};
    let artist, song;
    songs.forEach(song => {
      song.forEach((item, i) => {
        for (let i = 0; i < item.songs.length; i++) {
          song = item.songs[i].trim();
          artist = item.artists[i].trim();
          reducedSongs[song] = artist;
        }
      })
    })
    return new Promise(resolve => resolve(reducedSongs));
  },

  //Get the two longest words for our spotify search
  getSongsLongestWords(song) {
    const words = song.split(' ');
    let one = '',
        two = '',
        temp;
    words.forEach(word => {
      if (word.length > two.length) {
        if (word.length > one.length) {
          temp = one;
          one = word;
          two = temp;
        } else {
          two = word;
        }
      }
    })
    return `${one} ${two}`;
  },

  removeFeaturing(artist) {
    const temp = artist.split(' ');
    const result = [];

    temp.forEach((word, i) => {
      if (word !== 'featuring' && word !== 'Featuring') {
        result.push(word)
      } else {
        temp.splice(i, temp.length)
      }
    })

    return result.join(' ');
  },

  fetchSpotifySongs(billboard) {
    let song, artist;
    return Promise.map(billboard, (val) => {
      song = encodeURI(this.getSongsLongestWords(val.song));
      artist = encodeURI(this.removeFeaturing(val.artist));
      return fetch(`https://api.spotify.com/v1/search?q=${song}%20artist:${artist}&type=track`)
        .then(response => response.json())
        .then(song => song)
    })
  },

  scrapeBillboardSongs(years) {
    return Promise.map(years, year => {
      return new Promise(resolve => {
        x(`http://www.billboard.com/archive/charts/${year}/hot-100`, 'tbody', [{
          songs: ['.views-field-field-chart-item-song'],
          artists: ['.views-field-field-chart-item-artist']
        }])(function(err, titles) {
          resolve(titles);
        });
      });
    })
  },

  createSpotifyPlaylist(user, id) {
    return fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access_token}`
      },
      body: JSON.stringify({
        name: 'Nostalgia Highschool Playlist'
      })
    })
  },

  addSongsToPlaylist(playlist, songs, id, access_token) {
    const playlistURIs = {};
    songs.forEach(song => {
      if (song.uri) {
        playlistURIs[song.uri] = true;
      }
    });
    return fetch(`https://api.spotify.com/v1/users/${id}/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        uris: Object.keys(playlistURIs)
      })
    })
  }
};