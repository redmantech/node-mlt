var assert = require('assert')
  , Producer = require('../../lib/mlt/producer')

var p = new Producer
delete p._attribs.id //ignore the id since it's UUID and unpredictable for the purposes of this test

p.attribs({
  in: 0,
  out: 999
})
p.props({
  mlt_service: 'pixbuff',
  resource: 'apples.jpg'
})

var xml = '<producer in="0" out="999"><property name="mlt_service" value="pixbuff"/><property name="resource" value="apples.jpg"/></producer>'
assert.equal(p.toString(),xml, "XML was malformed")