var Transition = require ('../transition/base')

var Mix = function (params) {
    Transition.call(this, params)
    this._attribs.mlt_service = 'mix'
}

Mix.prototype = new Transition()

module.exports = Mix
