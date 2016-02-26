var assert = require('assert')
    , Affine = require('../../../lib/mlt/transition/affine')

var transition = new Affine({
    start: 100,
    length: 25,
    from: 0,
    to: 1
})

transition._attribs.id = 'abc'

var xml = '<transition id="abc" mlt_service="affine" in="100" out="124" a_track="0" b_track="1"/>'
assert.equal(transition.toString(), xml)

transition.property('ox', '100')
transition.property('oy', '100')

xml = '<transition id="abc" mlt_service="affine" in="100" out="124" a_track="0" b_track="1">' +
    '<property name="ox" value="100"/>' +
    '<property name="oy" value="100"/>' +
    '</transition>'
assert.equal(transition.toString(), xml)
