var _ = require('underscore')
  , Property = require('../mlt/property')

module.exports = {
  _attrs: function (att, val) {
    return this._setPropsOrAttribs(att, val, true)
  },
  _props: function (prop, val) {
    return this._setPropsOrAttribs(prop, val, false)
  },
  _setPropsOrAttribs: function (name, val, is_att) {
    if (typeof name == 'string' && val === undefined) {
      if (is_att) {
        return this._attribs[name]
      }
      else {
        return this._inner[name] ? this._inner[name].val() : null
      }
    }

    if (typeof name == 'string') {
      this._setPropOrAttrib(name, val, is_att)
    }
    else {
      _.each(
        name, 
        function(val, name) {
          this._setPropOrAttrib(name, val, is_att)
        },
        this
      )
    }

    return this
  },
  _setPropOrAttrib: function (name, val, is_att) {
    if (name == 'id') {
      console.warn('***WARNING*** MLT IDs are handled internally. Skipped ' + (is_att ? 'Attribute' : 'Property'))
      return
    }
    if (this._clearPropOrAttrib(name, val, is_att)) {
      return
    }

    if ((!is_att && this._attribs[name]) || (is_att && this._inner[name]))  {
      console.warn('***WARNING*** Attribute and Property named "' + name + '" are in conflict')
    }

    if(is_att) {
      this._attribs[name] = val
    }
    else {
      this._inner[name] = new Property(name, val)
    }
  },
  _clearPropOrAttrib: function(name, val, is_att) {
    if (val === '' || val === null) {
      if (is_att) {
        delete this._attribs[name]
      }
      else {
        delete this._inner[name]
      }
      return true
    }  
    return false
  }
}