var _ = require('underscore')
  , uuid = require('node-uuid')

var Affine = function (params) {
  this._attribs = {
    mlt_service: 'affine',
    id: uuid()
  }

  if (params) {
    if (params.start > 0) {
      this._attribs.in = params.start
    }

    if (params.length !== undefined) {
      this._attribs.out = (params.start || 0) + params.length - 1
    }

    if (params.track !== undefined) {
      this._attribs.track = params.track
    }
  }
}

Affine.prototype = _.extend(Affine.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))

Affine.prototype._node = 'filter'

Affine.prototype.geometry = function (geometries) {
  if (geometries === undefined) {
    return this._geometries
  }

  this._geometries = geometries
  _.each(
    geometries, 
    function (geometry) {
      var geometries = this._attribs['transition.geometry'] || ''
      geometries += geometry.frame + '=' + geometry.x + '/' + geometry.y + ':'
      geometries += geometry.w + 'x' + geometry.h + ':' + geometry.sat + ';'

      this._attribs['transition.geometry'] = geometries
    },
    this
  )

  this._attribs['transition.geometry'] = this._attribs['transition.geometry'].replace(/;$/, '')
  return this
};

Affine.prototype.id = function () {
  return this._attribs.id
};

module.exports = {
  Affine: Affine 
}