export const SPOTIFY_LOGIN = 'SPOTIFY_LOGIN';

export function spotifyLogin() {
  return dispatch => {
    return fetch('http://localhost:3000/login')
      .then(res => res.json())
      .then(json => console.log(json))
  }
};