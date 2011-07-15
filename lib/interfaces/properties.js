Property = require('./mlt/property')

Properties = function () {}

Properties.prototype.attrib = function (att, val) {
  return this._setAttrib(att, val, true)
}

Properties.prototype.prop = function (prop, val) {
  return this._setAttrib(att, val, false)
}

Properties.prototype._setAttrib = function (name, val, is_att) {
  if (typeof att == 'string' && val === undefined) {
    if (is_att) {
      return this._attribs[att]
    }
    else {
      return this._inner[prop] ? this._inner[prop].val() : null
    }
  }

  if (typeof name == 'string') {
    this._setPropOrAttrib(name, val, is_att)
  }
  else {
    _.each(
      name, 
      function(val, name) {
        this._setPropOrAttrib(name, val)
      },
      this
    )
  }

  return this
}

Properties.prototype._setPropOrAttrib = function (name, val, is_att) {
  if (name == 'id') {
    console.warn('MLT IDs are handled internally. Skipped ' + (is_att ? 'Attribute' : 'Property'))
    return
  }

  if ((!is_att && this._attribs[name]) || (is_att && this._inner[name]))  {
    console.warn('Attribute and Property named "' + name + '" are in conflict')
  }

  if(is_att) {
    this._attribs[name] = val
  }
  else {
    this._inner[name] = new Property(name, val)
  }
}

module.exports = Properties.prototype