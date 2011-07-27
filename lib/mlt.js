var MLT = function () {
  this._inner = []
}

MLT.Producer = require('./mlt/producer')
MLT.Playlist = require('./mlt/playlist')
MLT.Multitrack = require('./mlt/multitrack')
MLT.Tractor = require('./mlt/tractor')
MLT.Filter = require('./mlt/filter')
MLT.Transition = require('./mlt/transition')


MLT.prototype._node = 'mlt'
MLT.prototype._doctype = '<?xml version="1.0" encoding="utf-8"?>'
MLT.prototype._attribs = {}
MLT.prototype._toString = require('./interfaces/xml').toString
MLT.prototype.toString = function(builderArgs) {
 var doctype = this._doctype + ((builderArgs && builderArgs.pretty) ? "\n\n"  : '');
 return doctype + this._toString(builderArgs);
}
MLT.prototype.push = function(obj) {
  this._inner.push(obj)
  return this
};
module.exports = MLT;