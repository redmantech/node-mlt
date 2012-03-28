var assert = require('assert')
  , Playlist = require('../../lib/mlt/playlist')
  , Producer = require('../../lib/mlt/producer')
  , p = new Playlist
  , producer = new Producer.Image({startFrame: 0, length: 600})

producer._attribs.id = 'abcd';

p.push({
  type: 'entry',
  producer: producer,
  startFrame: 1400,
  length: 600
}).push({
  type: 'blank',
  length: 1000
}).push({
  type: 'producer',
  producer: producer
})._attribs.id = 'efgh'

var xml = '<playlist id="efgh"><entry producer="abcd" in="1400" out="1999"/><blank length="1000"/><producer id="abcd" mlt_service="pixbuf" out="599"/></playlist>'
assert.equal(p.toString(), xml, "Playlist Push Failure")