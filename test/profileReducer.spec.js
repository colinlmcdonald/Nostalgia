import { applySpotify, profile, testMatches }  from '../reducers/reducerProfile';
import expect                                  from 'expect';
import * as constants                          from '../constants/index';

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
          Spotify: 'Track Info'
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
        allSongs: updatedSongs
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
          Spotify: 'Track Info'
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
        allSongs: updatedSongs
      }
    )
  });

  it('testMatches', () => {
    let sg1 = 'Independent Women Part II';
    let sg2 = 'Independent Women Pt. II';

    expect(testMatches(sg1, sg2)).toEqual(true);

    sg1 = 'The lady doth protest too much';
    sg2 = 'The thing does not do any stuff';

    expect(testMatches(sg1, sg2)).toEqual(false);
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
          Spotify: 'Track Info'
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
        allSongs: updatedSongs
      }
    )
  });
});