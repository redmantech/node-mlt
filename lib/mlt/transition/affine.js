var Transition = require ('../transition/base')

var Affine = function (params) {
    Transition.call(this, params)
    this._attribs.mlt_service = 'affine'
}

Affine.prototype = new Transition()

module.exports = Affine
