var assert = require('assert')
  , Tractor = require('../../lib/mlt/tractor')
  , Multitrack = require('../../lib/mlt/multitrack')
  , tractor = new Tractor
  , multitrack = new Multitrack

  
multitrack._attribs.id = 'efgh'
tractor._attribs.id = 'abcd'
tractor.push(multitrack)

var xml= '<tractor id="abcd"><multitrack id="efgh"/></tractor>'
assert.equal(tractor.toString(), xml, "Tractor push failed")