var _ = require('underscore')

var Property = function (name, value) {
  this._attribs = {
    name: name,
    value: value
  }
}

Property.prototype = _.extend(Property.prototype, require('../interfaces/xml'))
Property.prototype._node = 'property'

module.exports = Property
