var assert = require('assert')
  , _ = require('underscore')

ObjWithProps = function () {
  this._attribs = {}
  this._inner = {}
}

ObjWithProps.prototype = _.extend(require('../../lib/interfaces/properties'), ObjWithProps.proto)

var a = new ObjWithProps;

//test attributes
a.attrib('mlt_type', 'producer')
assert.equal(a.attrib('mlt_type'), 'producer', 'Attribute set by string failed')

a.attrib({
  mlt_service: 'avformat',
  resource: 'banana.jpg',
})
assert.equal(a.attrib('resource'), 'banana.jpg', 'Attribute set by object failed')

a.attrib('mlt_service', 'pixbuff')
assert.equal(a.attrib('mlt_service'), 'pixbuff', 'Attribute overwrite failed')

//test properties
console.log('vvvvv EXPECTED WARNING vvvvv')
a.prop('mlt_service', 'avformat')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
assert.equal(a.prop('mlt_service'),'avformat', 'Property set by string failed')

a.prop({
  kdenlive_id: 'kdenlive_producer',
  kdenlive_type: 'kdenlive_pixbuff'
})
assert.equal(a.prop('kdenlive_id'), 'kdenlive_producer', 'Property set by object failed')

a.prop('kdenlive_type', 'kdenlive_avformat')
assert.equal(a.prop('kdenlive_type'), 'kdenlive_avformat')

a.prop('mlt_service', '')
assert.equal(a.prop('mlt_service'), undefined, 'Property clear failed')

a.attrib('mlt_service', '')
assert.equal(a.attrib('mlt_service'), undefined, 'Attribute clear failed')

console.log('vvvvv EXPECTED WARNING vvvvv')
a.prop('id', '')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
console.log('vvvvv EXPECTED WARNING vvvvv')
a.attrib('id', '2')
console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^')