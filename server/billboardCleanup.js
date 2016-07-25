'use strict'

module.exports = {
  billboardCleanup(data, res) {
    const matches = [];
    const songs = data[0].songs;
    const artists = data[0].artists;
    let artist;
    songs.forEach((song, i) => {
      song = song.trim();
      artist = artists[i].trim();
      matches.push({
        song: song,
        artist: artist
      });
    });
    return new Promise((resolve, reject) => {

    })
  },

  fetchSpotify(billboard, res) {
    billboard.reduce((start, item) => {
      return fetch(`https://api.spotify.com/v1/search?q=${item.song}&type=track`)
        .then(response => response.json())
        .then(spot => start.push(spot))
    }, [])
  }
}