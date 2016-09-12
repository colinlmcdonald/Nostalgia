var cp = require('../server/createPlaylist');
var expect = require('expect');
var spotify = require('../data');
var testSpotifySongs = require('../playground')

describe('Server Helper Functions', () => {
  it('longestWords should find the two longest words', () => {
    var words = 'The computer doth protest too much';
    expect(cp.longestTwoWords(words)).toEqual('computer protest');

    words = 'These are many of the words that I type when I want to type many words';
    expect(cp.longestTwoWords(words)).toEqual('These words');
  })

  it('removeFeaturing should remove featuring and all other artist\'s', () => {
    var artist = 'Twista Featuring Kanye West & Jamie Foxx';

    expect(cp.removeFeaturing(artist)).toEqual('Twista');

    artist = 'Destiny\'s Child featuring Someone Else';
    expect(cp.removeFeaturing(artist)).toEqual('Destiny\'s Child');
  })
})

describe('Testing matching spotify and billboard songs', () => {
  it('should match the snoop diggity dog', () => {
    var snoop = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'Drop It Like It\'s Hot - Instrumental'
      })
      return found.length
    })
    var snoop2 = {
      allSongs: [{
      song: 'Drop It Like It\'s Hot',
      artist: 'Snoop Dogg'
    }]}
    // console.log(snoop);
    var snoop3 = snoop[0].tracks.items[0];
    snoop3.song = 'Drop It Like It\'s Hot';
    snoop3.artist = 'Snoop Dogg';

    expect(testSpotifySongs.applySpotify(snoop2, snoop)[0]).toEqual(snoop3);
  })

  it('should match Nelly all hot up in herre', () => {
    var snoop = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'Dilemma'
      })
      return found.length
    })
    var snoop2 = {
      allSongs: [{
      song: 'Dilemma',
      artist: 'Nelly'
    }]}
    // console.log(snoop);
    var snoop3 = snoop[0].tracks.items[0];
    snoop3.song = 'Dilemma';
    snoop3.artist = 'Nelly';
    testSpotifySongs.applySpotify(snoop2, snoop)
    // expect(testSpotifySongs.applySpotify(snoop2, snoop)[0]).toEqual(snoop3);
  })
})