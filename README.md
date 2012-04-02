# xmlbuilder-js

An Media Lovin' Toolkit XMLBuilder for [node.js](http://nodejs.org/) based on
XMLBuilder (https://raw.github.com/oozcitak/xmlbuilder-js/) and Kdenlive (http://http://www.kdenlive.org/)

## Create a New MLT document and output it.
```js
var MLT = require('node-mlt');

var mlt = new MLT
console.log(mlt.toString());
//<?xml version="1.0" encoding="utf-8"?><mlt/>
console.log(mlt.toString({pretty: true}));
// <?xml version="1.0" encoding="utf-8"?>
//
//<mlt/>
//
```

## Add producers to your MLT document
```js
music = new MLT.Producer.Audio({source: '/home/jeffrey/Downloads/crazy.mp3'});
mlt.push(music);

image = new MLT.Producer.Image({source: '/home/jeffrey/Desktop/dachshund.jpg'});
mlt.push(image);
```

##Create affine filter
```js
var affine = (new MLT.Filter.Affine).geometry([
  {
    frame: 0,
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    sat: 100
  },
  {
    frame: 999,
    x: 480,
    y: 640,
    w: 480,
    h: 640,
    sat: 100
  } 
]);
```

##Create a watermark filter
```js
var watermark = new MLT.Filter.Watermark({resource: '/home/jeffrey/Desktop/signature.jpg'});
```

##Create an audio-gain filter
```js
var fadeIn = new MLT.Filter.AudioFade({
  start: 0,
  length: 100,
  startVol: 0,
  endVol: 1
});
```

## Add producers to a playlist with filters
```js
var playlist = new MLT.Playlist;

playlist.entry({producer: music, filters: [fadeIn], length: 1000); //length is in frames
mlt.push(playlist);
```

##Add a playlist to a track
```js
var track = new MLT.Multitrack.Track(playlist);
```

##Add a track to a multitrack
```js
var multitrack = new MLT.Multitrack;
multitrack.addTrack(track);
```

##Add a multitrack to a tractor
```js
var tractor = new MLT.Tractor;
tractor.push(multitrack);
mlt.push(tractor);
```
