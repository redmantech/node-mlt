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

    var doc = require('xmlbuilder').create()
      , root = doc.begin(this._node)
      , inner = typeof this._inner == 'string' ? this._inner : '';

    for (var i in this._attribs) { //can't use underscore here. length with integer val fails (see blank.js)
      root.att(i, this._attribs[i])
    }

    if (this._cdata) {
      root.cdata(this._cdata)
    }
    else
    if (inner) {
      root.txt(inner)
    }
    else {
      _.each(this._inner, function (subObj) {
        subObj = (!inner && builderArgs.pretty ? "\n" : "") + subObj.toString(builderArgs)
        
        
        if (builderArgs.pretty) {
          subObj = subObj.replace(/\n/g, "\n  ")
        }
       
        inner += subObj
      })

      if (inner) {
        root.raw(builderArgs.pretty ? inner.replace(/[^\n]+$/g, '') : inner);
      }
    }

    return root.toString(builderArgs)
  }
}
