var cp = require('../server/createPlaylist');
var expect = require('expect');

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