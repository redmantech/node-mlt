var assert = require('assert')
    , Profile = require('../../lib/mlt/profile')

var profile = new Profile()
profile.attribs('sample_aspect_num', 1)
profile.attribs('sample_aspect_den', 1)
profile.attribs('frame_rate_num', 30000)
profile.attribs('frame_rate_den', 1001)
profile.attribs('colorspace', 709)

var xml = '<profile sample_aspect_num="1" sample_aspect_den="1" frame_rate_num="30000" frame_rate_den="1001" colorspace="709"/>'
assert.equal(profile.toString(), xml)
