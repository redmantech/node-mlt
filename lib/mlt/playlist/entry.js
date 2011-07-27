var _ = require('underscore')

var Entry = function (options) {
  this._attribs = {}

  if (options) {
    if (options.producer) {
      this._attribs.producer = options.producer.id()
    }
    if (options.startFrame) {
      this._attribs.in = options.startFrame
    }
    if (options.length) {
      this._attribs.out = (options.startFrame || 0) + options.length - 1
    }
    if (options.filters) {
      this._inner = options.filters
    }
  }
}

Entry.prototype = _.extend(Entry.prototype, require('../../interfaces/xml.js'))
Entry.prototype._node = 'entry'

module.exports = Entry