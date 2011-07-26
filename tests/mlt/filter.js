var assert = require('assert')
  , Filter = require("../../lib/mlt/filter")

var filter = new Filter.Affine({
  start: 100,
  length: 1000,
  track: 1
})
filter._attribs.id = 'abc'

var xml = '<filter mlt_service="affine" id="abc" in="100" out="1099" track="1"/>'
assert.equal(filter.toString(), xml, "Affine Constructor")


filter.geometry([
  {
    frame: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    sat: 0 
  },
  {
    frame: 100,
    x: -1280,
    y: -1024,
    w: 1280,
    h: 1024,
    sat: 100
  },
  {
    frame: 200,
    x: 1280,
    y: 1024,
    w: 1,
    h: 1,
    sat: 1
  }
])

var xml ='<filter mlt_service="affine" id="abc" in="100" out="1099" track="1" transition.geometry="0=0/0:0x0:0;100=-1280/-1024:1280x1024:100;200=1280/1024:1x1:1"/>'
assert.equal(filter.toString(), xml, "Affine Geometry")