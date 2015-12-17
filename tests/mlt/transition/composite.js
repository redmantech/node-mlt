var assert = require('assert')
    , Composite = require('../../../lib/mlt/transition/composite')

var transition = new Composite({
    start: 100,
    length: 25,
    from: 0,
    to: 1
})

transition._attribs.id = 'abc'

var xml = '<transition id="abc" mlt_service="composite" in="100" out="124" a_track="0" b_track="1"/>'
assert.equal(transition.toString(), xml)

