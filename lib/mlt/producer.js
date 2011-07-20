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

    producer._attribs('mlt_service', 'pixbuff')

    if (params) { 
      if (params.length) {
        producer._attribs('out', params.length)
      }
      if (params.source) {
        producer._attribs('resource', params.source)
      }
    }

    return producer
  },
  Audio: function (params) {
    var producer = new Producer

    producer._attribs('mlt_service', 'avformat')

    if (params) {
      if (params.frameStart) {
        producer._attribs('in', params.frameStart)
      }
      if (params.length) {
        producer._attribs('out', params.frameStart + params.length - 1) //0 indexed so -1
      }
      if (params.source) {
        producer._attribs('resource', params.source)
      }
    }

    return producer
  },
  Video: function (params) {
    return this.Audio(params)
  }
}