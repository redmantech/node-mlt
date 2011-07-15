var _ = require('underscore')
  , uuid = require('node-uuid')

Producer = function () {
  this._attribs = {
    id: uuid()
  }
  this._inner = {}
}

Producer.prototype._node = 'producer'
Producer.prototype = _.extend(require('../xml'), require('../properties'), Producer.prototype)

module.exports = Producer