var _ = require('underscore')

var Profile = function () {
    this._attribs = {}
}

Profile.prototype.attribs = function(name, value) {
    this._attribs[name] = value
    return this
}

Profile.prototype = _.extend(Profile.prototype, require('../interfaces/xml'))
Profile.prototype._node = 'profile'

module.exports = Profile
