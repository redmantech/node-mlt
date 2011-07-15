var _ = require('underscore')

var Property = function (name, value) {
  this._attribs = {
    name: name,
    value: value
  }
}

Property.prototype._node = 'property'
Property.prototype.val = function () {
  return this._attribs.value
}
Property.prototype = _.extend(require('../xml'), Property.prototype)

module.exports = Property
