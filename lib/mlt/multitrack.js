var _ = require('underscore')
  , uuid = require('node-uuid')

var Multitrack = function () {
  this._attribs = {
    id: uuid()
  }

  this._inner = []
}

Multitrack.Track = require('./multitrack/track')

Multitrack.prototype = _.extend(Multitrack.prototype, require('../interfaces/xml'))
Multitrack.prototype._node = 'multitrack'
Multitrack.prototype.addTrack = function(track) {
  this._inner.push(track)
  return this
}

module.exports = Multitrack