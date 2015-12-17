var Transition = require ('../transition/base')

var Composite = function (params) {
    Transition.call(this, params)
    this._attribs.mlt_service = 'composite'
}

Composite.prototype = new Transition()

module.exports = Composite
