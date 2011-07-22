var MLT = function () {
  this._inner = []
}

MLT.Producer = require('./mlt/producer')
MLT.Playlist = require('./mlt/playlist')
MLT.Multitrack = require('./mlt/multitrack')
MLT.Tractor = require('./mlt/tractor')

MLT.prototype._node = 'mlt'
MLT.prototype._doctype = '<?xml version="1.0" encoding="utf-8"?>'
MLT.prototype._attribs = {}
MLT.prototype._toString = require('./interfaces/xml').toString
MLT.prototype.toString = function(builderArgs) {
 var doctype = this._doctype + ((builderArgs && builderArgs.pretty) ? "\n\n"  : '');
 return doctype + this._toString(builderArgs);
}

module.exports = MLT;