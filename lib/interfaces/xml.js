/***
Dictates a structure for an XML object and 
a toString() to generate that xml.

As with xmlbuilder you can use {pretty: true} as an argument
for toString
***/

var _ = require('underscore')

module.exports = {
  toString: function (builderArgs) {
    if(!this._node)
      throw new Error("Could not continue. Node name cannot be blank.")
    
    builderArgs = builderArgs || {}

    var builder = require('xmlbuilder')
      , root = builder.begin(this._node)
      , inner = typeof this._inner == 'string' ? this._inner : '';

    _.each(this._attribs, function (value, name) {
      root.att(name,value)
    })

    if (inner) {
      root.txt(inner)
    }
    else {
      _.each(this._inner, function (subObj) {
        subObj = (builderArgs.pretty ? "\n" : "") + subObj.toString(builderArgs)
        if (builderArgs.pretty) {
          subObj = subObj.replace(/\n/g, "\n  ")
        }
        inner += subObj
      })

      if (inner) {
        root.raw(inner);
      }
    }

    return root.toString(builderArgs)
  }
}
