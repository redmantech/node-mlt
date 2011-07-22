var _ = require('underscore')
  , uuid = require('node-uuid')
  , Blank = require('./playlist/blank')
  , Entry = require('./playlist/entry')
var Playlist = function () {
  this._attribs = {
    id: uuid()
  }

  this._inner = []
}
Playlist.prototype = _.extend(Playlist.prototype, require('../interfaces/xml'))
Playlist.prototype._node = 'playlist'

Playlist.prototype.id = function() {
  return this._attribs.id
};

Playlist.prototype.blank = function(length) {
  this._inner.push(new Blank(length))
  return this
}

Playlist.prototype.producer = function(producer) {
  this._inner.push(producer)
  return this
}

Playlist.prototype.entry = function (params) {
  this._inner.push(new Entry(params))
  return this
}

Playlist.prototype.push = function(params) {
  if (params.type == 'blank') {
    return this.blank(params.length)
  }
  else if (params.type == 'producer') {
    return this.producer(params.producer)
  }
  else if (params.type == 'entry') {
    delete params.type
    return this.entry(params)
  }
  else {
    throw new Error('Type undefined.')
  }
}

module.exports = Playlist