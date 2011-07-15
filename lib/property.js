var XML = require('./xml.js')

var Property = function (name, value) {
  this._node = 'property'
  this._attribs = {
    name: name,
    value: value
  }
}

Property.prototype = XML.prototype

module.exports = Property
