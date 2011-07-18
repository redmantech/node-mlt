var _ = require('underscore')
  , uuid = require('node-uuid')

Producer = function () {
  this._attribs = {
    id: uuid()
  }
  this._inner = {}
}

Producer.prototype = _.extend(Producer.prototype, require('../interfaces/xml'), require('../interfaces/properties'))
Producer.prototype._node = 'producer'

Producer.prototype.id = function () {
  return this._attribs.id
}

module.exports = Producer