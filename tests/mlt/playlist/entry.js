var assert = require('assert')
  , Entry = require('../../../lib/mlt/playlist/entry.js')

var entry = new Entry({
  producer: {
    id: function ()  { return 'abc' } 
  },
  startFrame: 100,
  length: 100
})

var xml = '<entry producer="abc" in="100" out="199"/>'
assert.equal(entry.toString(), xml, "Entry builder failed")