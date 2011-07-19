var assert = require('assert')
  , Entry = require('../../../lib/mlt/playlist/entry.js')

var entry = new Entry({
  in: 0,
  out: 999,
  producer: {
    id: function () {return 1} //(go ducktyping)
  }
})

entry.in(999).out(1999).producer({ id: function () {return 2} })

var xml = '<entry in="999" out="1999" producer="2"/>'
assert.equal(entry.toString(), xml, "XML generation failed")
assert.equal(entry.in(), 999, "In getter/setter failed")
assert.equal(entry.out(), 1999, "Out getter/setter failed")
assert.equal(entry.producer(), 2, "Producer getter/setter failed")