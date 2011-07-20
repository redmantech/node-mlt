var _ = require('underscore')

var Track = function (producer) {
  this._attribs = {
    producer: producer.id()
  }
}

Track.prototype = _.extend(Track.prototype, require('../../interfaces/xml'))
Track.prototype._node = 'track'

module.exports = Track