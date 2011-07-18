var _ = require('underscore')

blank = function (length) {
  this._attribs = {
    length: length
  }
}

blank.prototype = _.extend(blank.prototype, require('../../interfaces/xml'))
blank.prototype._node = 'blank'

module.exports = blank 