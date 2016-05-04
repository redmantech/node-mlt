# Node MLT

This module will generate the XML-based instructions needed to power a [Media Lovin' Toolkit](http://www.mltframework.org/) trascoded video, including audio overlays, transitions, picture slides, and watermarks.

## Examples

See the examples folder for example applications using the library. The library's main demo can take a Flickr playlist, download the imges, play them in a simple slideshow, and adding a random music file if provided.

Requirements: wget, ffmpeg, melt, (libx264 if you use default configuration)
You must also create examples/config.js with your flickr apikey and ffmpeg options (see examples/config.examples.js)

## Api

### MLT xml object
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

### Add producers to your MLT document
```js
music = new MLT.Producer.Audio({source: '/home/jeffrey/Downloads/crazy.mp3'});
mlt.push(music);

text = new MLT.Producer.Text({
    text: 'Hello <b>world</b>!',
    color: 'red',
    background: '0x00FFFF',
    family: 'Arial',
    size: '30'
});
mlt.push(text);

color = new MLT.Producer.Color({color: 'red'});
mlt.push(color);

image = new MLT.Producer.Image({source: '/home/jeffrey/Desktop/dachshund.jpg'});
mlt.push(image);

slideshow = new MLT.Producer.Image({
    source: '/home/jeffrey/Desktop/frame-%04d.jpg',
    delay: 5*25,
    loop: 0
});
mlt.push(slideshow);
```

### Create affine filter
```js
var affine = new MLT.Filter.Affine
affine.geometry([
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

### Create a watermark filter
```js
var watermark = new MLT.Filter.Watermark({resource: '/home/jeffrey/Desktop/signature.jpg'});
```

### Create an audio-gain filter
```js
var fadeIn = new MLT.Filter.AudioFade({
  start: 0,
  length: 100,
  startVol: 0,
  endVol: 1
});
```

### Create a Frei0r blur filter
```js
var frei0r = new MLT.Filter.Frei0r
frei0r.squareblur([
  {
    frame: 0,
    size: 0.05
  },
  {
    frame: 22,
    size: 0
  }
]);

```

### Add producers to a playlist with filters
```js
var playlist = new MLT.Playlist;

playlist.entry({producer: music, filters: [fadeIn], length: 1000); //length is in frames
mlt.push(playlist);
```

### Add a playlist to a track
```js
var track = new MLT.Multitrack.Track(playlist);
```

### Add a track to a multitrack
```js
var multitrack = new MLT.Multitrack;
multitrack.addTrack(track);
```

### Add a multitrack to a tractor
```js
var tractor = new MLT.Tractor;
tractor.push(multitrack);
mlt.push(tractor);
```
