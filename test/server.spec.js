var cp = require('../server/createPlaylist');
var expect = require('expect');
var spotify = require('../data');
var testSpotifySongs = require('../playground')

//TODO: Edit all songs to slice for the 3rd version of each song list

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
    var nelly = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'Dilemma'
      })
      return found.length
    })
    var nelly2 = {
      allSongs: [{
      song: 'Dilemma',
      artist: 'Nelly'
    }]}
    var nelly3 = nelly[0].tracks.items[0];
    nelly3.song = 'Dilemma';
    nelly3.artist = 'Nelly';
    testSpotifySongs.applySpotify(nelly2, nelly)
    expect(testSpotifySongs.applySpotify(nelly2, nelly)[0]).toEqual(nelly3);
  })

  it('should NOT match how you remind me and u remind me', () => {
    var nickelcrack = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'How You Remind Me';
      })
      return found.length
    })
    var nickelcrack2 = {
      song: 'How You Remind Me',
      artist: 'Nickelback'
    }

    var usher = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'U Remind Me';
      })
      return found.length
    })
    var usher2 = {
      song: 'U Remind Me',
      artist: 'Usher'
    };
    var usher3 = usher[0].tracks.items[0];
    var nickelcrack3 = nickelcrack[0].tracks.items[0]
    usher3.song = 'U Remind Me';
    usher3.artist = 'Usher';
    nickelcrack3.song = 'How You Remind Me';
    nickelcrack3.artist = 'Nickelback';
    var billboard = {};
    var spotifySongs = [nickelcrack[0], usher[0]];
    billboard.allSongs = [nickelcrack2, usher2];
    // console.log(nickelcrack3, usher3);
    expect(testSpotifySongs.applySpotify(billboard, spotifySongs)).toEqual([nickelcrack3, usher3]);
  })

  it('should match Ciara good eats', () => {
    var foundIt = spotify.reduce((start, song) => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'Goodies'
      })
      if (found.length) {
        start = found;
      }
      return start;
    })
    var ciara = spotify.filter(song => {
      var found = song.tracks.items.filter(item => {
        return item.name === 'Goodies';
      })
      return found.length
    })
    var ciara2 = {
      allSongs: [{
      song: 'Goodies',
      artist: 'Ciara Featuring Petey Pablo'
    }]}
    var ciara3 = ciara.slice(0);
    ciara3.song = 'Goodies';
    ciara3.artist = 'Ciara Featuring Petey Pablo';
    expect(!!testSpotifySongs.applySpotify(ciara2, ciara, true)[0]).toBe(true);
  })

})