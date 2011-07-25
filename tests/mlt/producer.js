var assert = require('assert')
  , Producer = require('../../lib/mlt/producer')

var p = new Producer.Image({
  length: 100,
  source: '/home/jeffrey/Downloads/banana.jpg'
})
p._attribs.id = '9571545a-b072-4a72-9b64-fec67563c1be' //override random number for testing

var xml = '<producer id="9571545a-b072-4a72-9b64-fec67563c1be" mlt_service="pixbuf" out="99" resource="/home/jeffrey/Downloads/banana.jpg"/>'
assert.equal(p.toString(), xml, "Image Builder Failed")

var a = new Producer.Audio({
  startFrame: 100,
  length: 100,
  source: '/home/jeffrey/Downloads/banana.mp3'
})
a._attribs.id = '9571545a-b072-4a72-9b64-fec67563c1be' //override random number for testing

var xml = '<producer id="9571545a-b072-4a72-9b64-fec67563c1be" mlt_service="avformat" in="100" out="199" resource="/home/jeffrey/Downloads/banana.mp3"/>'
assert.equal(a.toString(), xml, "Audio Builder Failed")

var v = new Producer.Video({
  length: 100,
  source: '/home/jeffrey/Downloads/banana.avi'
})
v._attribs.id = '9571545a-b072-4a72-9b64-fec67563c1be' //override random number for testing

var xml = '<producer id="9571545a-b072-4a72-9b64-fec67563c1be" mlt_service="avformat" out="99" resource="/home/jeffrey/Downloads/banana.avi"/>'
assert.equal(v.toString(), xml, "Video Builder Failed")
