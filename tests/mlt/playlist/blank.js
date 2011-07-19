var assert = require('assert')
  , Blank = require('../../../lib/mlt/playlist/blank')

var b = new Blank(999)

assert.equal(b.toString(), '<blank length="999"/>', "XML Generation failed.")