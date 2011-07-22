var assert = require('assert')
  , _ = require('underscore')
  , MLT = require('../lib/mlt.js')

var mlt = new MLT

var xml = '<?xml version="1.0" encoding="utf-8"?><mlt/>'

assert.equal(mlt.toString(), xml, 'MLT XML Generation Failed')
