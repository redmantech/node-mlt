var assert = require('assert')
  , Track = require('../../../lib/mlt/multitrack/track')

t = new Track( {
  id: function () {
    return 'abc'
  }
});

var xml = '<track producer="abc"/>'
assert.equal(t.toString(), t, 'Track constructor failed')