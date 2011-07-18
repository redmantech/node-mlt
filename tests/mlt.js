var assert = require('assert')
  , _ = require('underscore')
  , MLT = require('../lib/mlt.js')

var mlt = new MLT

var producers = {}

var p = new MLT.Producer
p._attribs.id = 'a' //override random number for testing.
producers[p.attribs({
  resource: 'usr/share/xml/docbook/stylesheet/docbook-xsl/images/warning.svg',
  mlt_service: 'pixbuff'
}).id()] = p

p = new MLT.Producer
p._attribs.id = 'b' //override random number for testing.
producers[p.id()] = p.props({
  resource: '/home/jeffrey/Music/Doc/Sphinx/01 - Sphinx',
  mlt_service: 'avformat'
})

_.each(producers, function(prod) {
  mlt.producers.push(prod)
})


var xml = '<?xml version="1.0" encoding="utf-8"?><mlt><producer id="a" resource="usr/share/xml/docbook/stylesheet/docbook-xsl/images/warning.svg" mlt_service="pixbuff"/><producer id="b"><property name="resource" value="/home/jeffrey/Music/Doc/Sphinx/01 - Sphinx"/><property name="mlt_service" value="avformat"/></producer></mlt>'

assert.equal(mlt.toString(), xml, 'XML Generation Failed')
