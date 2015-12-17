var assert = require('assert')
    , Luma = require('../../../lib/mlt/transition/luma')
    , Property = require('../../../lib/mlt/property')

var transition = new Luma({
    start: 100,
    length: 25,
    from: 0,
    to: 1
})

transition._attribs.id = 'abc'

var xml = '<transition id="abc" mlt_service="luma" in="100" out="124" a_track="0" b_track="1"/>'
assert.equal(transition.toString(), xml)

transition.property('resource', '%luma01.pgm')

xml = '<transition id="abc" mlt_service="luma" in="100" out="124" a_track="0" b_track="1">' +
    '<property name="resource" value="%luma01.pgm"/>' +
    '</transition>'
assert.equal(transition.toString(), xml)


