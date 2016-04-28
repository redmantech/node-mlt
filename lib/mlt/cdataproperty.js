var _ = require('underscore')

var CDataProperty = function (name, value) {
  this._attribs = {
    name: name
  }
  this._cdata = value;
}

CDataProperty.prototype = _.extend(CDataProperty.prototype, require('../interfaces/xml'))
CDataProperty.prototype._node = 'property'

module.exports = CDataProperty
