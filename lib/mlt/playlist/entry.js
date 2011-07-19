var _ = require('underscore')

var Entry = function (options) {
  this._attribs = {}

  if (options) {
    if (options.in !== undefined) {
      this._attribs.in = options.in  
    }
    if (options.out !== undefined) {
      this._attribs.out = options.out  
    }
    if (options.producer){
      this._attribs.producer = options.producer.id() 
    }
  }
}

Entry.prototype = _.extend(Entry.prototype, require('../../interfaces/xml.js'))
Entry.prototype._node = 'entry'
Entry.prototype.in = function (start) {
  return this._attribs;
}

entry = new Entry({
  in: 0,
  out: 999,
  producer: {
    id: function () {return 1}
  }
});

console.log(entry.toString())