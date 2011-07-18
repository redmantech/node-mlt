MLT = function () {
  this.producers = []
  this.playlists = []
}

MLT.Producer = require('./mlt/producer.js')

MLT.prototype._node = 'mlt'
MLT.prototype._doctype = '<?xml version="1.0" encoding="utf-8"?>'
MLT.prototype._attribs = {}
MLT.prototype._toString = require('./interfaces/xml').toString
MLT.prototype.toString = function(builderArgs) {
 
 this._inner = this.producers.concat(this.playlists)

 var doctype = this._doctype + ((builderArgs && builderArgs.pretty) ? "\n\n"  : '');

 return doctype + this._toString(builderArgs);
}

module.exports = MLT;