var _ = require('underscore')
  , uuid = require('node-uuid')
  , CDataProperty = require('./cdataproperty')

var Producer = function () {
  this._attribs = {
    id: uuid()
  }
  this._inner = []
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
      if (params.delay) {
        producer._attrs('ttl', params.delay)
      }
      if (params.loop) {
        producer._attrs('loop', params.loop)
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
  },
  Text: function (params) {
    var producer = new Producer

    producer._attrs('mlt_service', 'pango')

    if (params) {
      if (params.length) {
        producer._attrs('out', params.length - 1) //0 indexed so -1
      }
      if (params.text) {
        producer._inner.push(new CDataProperty('markup', params.text))
      }
      if (params.color) {
        producer._attrs('fgcolour', params.color)
      }
      if (params.background) {
        producer._attrs('bgcolour', params.background)
      }
      if (params.family) {
        producer._attrs('family', params.family)
      }
      if (params.size) {
        producer._attrs('size', params.size)
      }
    }

    return producer
  }
}