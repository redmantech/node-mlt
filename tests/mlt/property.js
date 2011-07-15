var assert = require('assert')
  , Property = require('../../lib/mlt/property.js')

var name = 'mlt_service'
  , value = 'avformat'
  , property = new Property(name, value);

assert.equal(property.toString(), '<property name="mlt_service" value="avformat"/>', "XML Generation Failed")