var _ = require('underscore')
    , uuid = require ('node-uuid')

var Transition = function (params) {
    this._attribs = {
        id: uuid(),
        mlt_service: "luma"
    }

    this._inner = {}

    if (params) {
        if (params.start !== undefined) {
            this._attribs.in = params.start
        }

        if (params.length !== undefined) {
            this._attribs.out = (this._attribs.in || 0) + params.length - 1
        }

        if (params.from !== undefined) {
            this._attribs.a_track = params.from
        }

        if (params.to !== undefined) {
            this._attribs.b_track = params.to
        }
    }

}

Transition.prototype.property = function(name, value) {
    this._props(name, value)
    return this
}

Transition.prototype = _.extend(Transition.prototype, require('../../interfaces/xml'), require('../../interfaces/properties'))
Transition.prototype._node = 'transition'

module.exports = Transition
