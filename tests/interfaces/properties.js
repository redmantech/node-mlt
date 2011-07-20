var assert = require('assert')
  , _ = require('underscore')

ObjWithProps = function () {
  this._attribs = {}
  this._inner = {}
}

ObjWithProps.prototype = _.extend(ObjWithProps.prototype, require('../../lib/interfaces/properties'))

ObjWithProps.prototype.attribs = function (att, val) {
  return this._attrs(att, val)
}
ObjWithProps.prototype.props = function (prop, val) {
  return this._props(prop, val)
}

var a = new ObjWithProps;

//test attributes
a.attribs('mlt_type', 'producer')
assert.equal(a.attribs('mlt_type'), 'producer', 'Attribute set by string failed')

a.attribs({
  mlt_service: 'avformat',
  resource: 'banana.jpg',
})
assert.equal(a.attribs('resource'), 'banana.jpg', 'Attribute set by object failed')

a.attribs('mlt_service', 'pixbuff')
assert.equal(a.attribs('mlt_service'), 'pixbuff', 'Attribute overwrite failed')

//test properties
console.log('vvvvv EXPECTED WARNING vvvvv')
a.props('mlt_service', 'avformat')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
assert.equal(a.props('mlt_service'),'avformat', 'Property set by string failed')

a.props({
  kdenlive_id: 'kdenlive_producer',
  kdenlive_type: 'kdenlive_pixbuff'
})
assert.equal(a.props('kdenlive_id'), 'kdenlive_producer', 'Property set by object failed')

a.props('kdenlive_type', 'kdenlive_avformat')
assert.equal(a.props('kdenlive_type'), 'kdenlive_avformat')

a.props('mlt_service', '')
assert.equal(a.props('mlt_service'), undefined, 'Property clear failed')

a.attribs('mlt_service', '')
assert.equal(a.attribs('mlt_service'), undefined, 'Attribute clear failed')

console.log('vvvvv EXPECTED WARNING vvvvv')
a.props('id', '')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
console.log('vvvvv EXPECTED WARNING vvvvv')
a.attribs('id', '2')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')