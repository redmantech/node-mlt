var assert = require('assert')
  , Multitrack = require('../../lib/mlt/multitrack')

var track = new Multitrack.Track({ id: function () { return 'abc' }})
  , multitrack = (new Multitrack).addTrack(track)

multitrack._attribs.id = 'def';

assert.equal(multitrack.toString(), '<multitrack id="def"><track producer="abc"/></multitrack>', "Multitrack with one track failed")
