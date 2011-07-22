var _ = require('underscore')
  , uuid = require('node-uuid')

var Tractor = function () {
  this._attribs = {
    id: uuid()
  }

  this._inner = []
}

Tractor.prototype = _.extend(Tractor.prototype, require('../interfaces/xml'))
Tractor.prototype._node = 'tractor'
Tractor.prototype.push = function(mltObj) {
  this._inner.push(mltObj)
  return this
};

module.exports = Tractor