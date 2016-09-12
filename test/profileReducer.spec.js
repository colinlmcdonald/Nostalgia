import { applySpotify, profile, 
  testSongMatches, testArtistMatches }    from '../reducers/reducerProfile';
import expect                             from 'expect';
import * as constants                     from '../constants/index';

describe('Song Matching Algorithm', () => {
  it('matches exact song titles', () => {
    const billboardSongs = [{
      song: 'Independent Women',
      artist: 'Beyonce'
    }];
    const spotifySongs = [{
      tracks: {
        items: [{
          name: 'Independent Women',
          Spotify: 'Track Info',
          artists: [{
            name: 'Beyonce'
          }]
        }]
      }
    }];
    const updatedSongs = [Object.assign({}, billboardSongs[0], spotifySongs[0].tracks.items[0])]

    expect(profile({
        allSongs: billboardSongs
      }, {
        type: constants.SPOTIFY_CHECK,
        payload: spotifySongs
      })
    ).toEqual(
      {
        allSongs: updatedSongs,
        spotify: true
      }
    )
  });

  it('matches song titles that contain the other', () => {
    const billboardSongs = [{
      song: 'Independent Women Pt. II',
      artist: 'Beyonce'
    }];
    const spotifySongs = [{
      tracks: {
        items: [{
          name: 'Independent Women',
          Spotify: 'Track Info',
          artists: [{
            name: 'Beyonce'
          }]
        }]
      },
      spotify: true
    }];
    const updatedSongs = [Object.assign({}, billboardSongs[0], spotifySongs[0].tracks.items[0])];

    expect(profile({
        allSongs: billboardSongs
      }, {
        type: constants.SPOTIFY_CHECK,
        payload: spotifySongs
      })
    ).toEqual(
      {
        allSongs: updatedSongs,
        spotify: true
      }
    )
  });

  it('testArtistMatches returns true when one of the names is a partial match with the other', () => {
    let art1 = 'Destiny\'s Child';
    let art2 = 'Destinys Child';

    expect(testArtistMatches(art1, art2)).toEqual(true);
  })

  it('testSongMatches returns true when at least two words match', () => {
    let sg1 = 'Independent Women Part II';
    let sg2 = 'Independent Women Pt. II';

    expect(testSongMatches(sg1, sg2)).toEqual(true);

    sg1 = 'The lady doth protest too much';
    sg2 = 'The thing does not do any stuff';

    expect(testSongMatches(sg1, sg2)).toEqual(false);
  })

  it('matches song titles that are not exact', () => {
    const billboardSongs = [{
      song: 'Independent Women Pt. II',
      artist: 'Beyonce'
    }];
    const spotifySongs = [{
      tracks: {
        items: [{
          name: 'Independent Women Part II',
          Spotify: 'Track Info',
          artists: [{
            name: 'Beyonce'
          }]
        }]
      }
    }];
    const updatedSongs = [Object.assign({}, billboardSongs[0], spotifySongs[0].tracks.items[0])];

    expect(profile({
        allSongs: billboardSongs
      }, {
        type: constants.SPOTIFY_CHECK,
        payload: spotifySongs
      })
    ).toEqual(
      {
        allSongs: updatedSongs,
        spotify: true
      }
    )
  });
});