var _ = require('underscore')

var Property = function (name, value) {
  this._attribs = {
    name: name,
    value: value
  }
}

Property.prototype = _.extend(Property.prototype, require('../interfaces/xml'))
Property.prototype._node = 'property'
Property.prototype.val = function() {
  return this._attribs.value
};


module.exports = Property
