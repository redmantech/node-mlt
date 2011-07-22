var _ = require('underscore')
  , uuid = require('node-uuid')

var Producer = function () {
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

module.exports = {
  Image: function (params) {
    var producer = new Producer

    producer._attrs('mlt_service', 'pixbuf')

    if (params) { 
      if (params.length) {
        producer._attrs('out', params.length - 1) //0 indexed so -1
      }
      if (params.source) {
        producer._attrs('resource', params.source)
      }
    }

    return producer
  },
  Audio: function (params) {
    var producer = new Producer

    producer._attrs('mlt_service', 'avformat')

    if (params) {
      if (params.startFrame) {
        producer._attrs('in', params.startFrame)
      }
      if (params.length) {
        producer._attrs('out', (params.startFrame || 0) + params.length - 1) //0 indexed so -1
      }
      if (params.source) {
        producer._attrs('resource', params.source)
      }
    }

    return producer
  },
  Video: function (params) {
    return function (params) {
      return this.Audio(params)
    }.call(module.exports, params)
  }
}