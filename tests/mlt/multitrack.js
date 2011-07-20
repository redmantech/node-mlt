var assert = require('assert')
  , Multitrack = require('../../lib/mlt/multitrack')

var track = new Multitrack.Track({ id: function () { return 'abc' }})
  , multitrack = (new Multitrack).addTrack(track)

console.log(multitrack.toString({pretty:true}))
