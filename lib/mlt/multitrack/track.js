var _ = require('underscore')

var Track = function (producer, params) {
  this._attribs = {
    producer: producer.id()
  }

  if (params) {
    if (params.start !== undefined) {
      this._attribs.in = params.start
    }

    if (params.length !== undefined) {
      this._attribs.out = (this._attribs.in || 0) + params.length - 1
    }
  }
}

Track.prototype = _.extend(Track.prototype, require('../../interfaces/xml'))
Track.prototype._node = 'track'

module.exports = Track