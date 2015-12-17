var Transition = require ('../transition/base')

var Luma = function (params) {
    Transition.call(this, params)
    this._attribs.mlt_service = 'luma'
}

Luma.prototype = new Transition()

module.exports = Luma
