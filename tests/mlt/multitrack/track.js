var assert = require('assert')
  , Track = require('../../../lib/mlt/multitrack/track')

var track = new Track( {
  id: function () {
    return 'abc'
  }
}, {
  start: 100,
  length: 25
});

var xml = '<track producer="abc" in="100" out="124" />'
assert.equal(track.toString(), track)