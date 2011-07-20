var _ = require('underscore')

var Blank = function (length) {
  this._attribs = {
    length: length
  }
}

Blank.prototype = _.extend(Blank.prototype, require('../../interfaces/xml'))
Blank.prototype._node = 'blank'

module.exports = Blank 