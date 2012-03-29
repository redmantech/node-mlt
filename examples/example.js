if (!process.argv[2]) {
  console.log('Useage: node example.js "{flickr text search}"');
  process.exit();
}

var fs = require('fs')
  , child_process = require('child_process')
  , _ = require('underscore')
  , step = require('step')
  , request = require('request')
  , gm = require('gm')
  , MLT = require('../lib/mlt')
  , config = require('./config.js')
  , flickerUrl = 'http://api.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=' + config.flickr.apiKey

step(
  function () { //Search Flickr by keyword
    var callback = this
      , url = flickerUrl + '&method=flickr.photos.search&license=7&text=' + process.argv[2];

    request.get({url: url}, function (err, resp, body) {
      if (err) {
        return callback(err);
      }

      body = JSON.parse(body);
      console.log(body.photos.total + ' Photos Found on Flickr');
      if (body.photos.total > 25) {
        console.log('Using the first 25.');
      }
      callback(null, body.photos.photo);
    });

  },
  function (err, photos) { //download photos to ./images/
    if (err) {
      throw err;
    }
    photos = photos.slice(0,25); //limit to 25 photos

    var count = 0
      , photoGroup = this.group()
      , musicCallback = this.parallel();

    fs.readdir('./audio/', function(err, resources) {
      if (err) {
        return musicCallback(err);
      }

      resource = process.cwd() + '/audio/' + _.first(_.sortBy(resources, function () {return Math.random()}));

      musicCallback(null, resource);
    })

    _.each(photos, function (photo, i) {
      var url = flickerUrl + '&method=flickr.photos.getSizes&photo_id=' + photo.id
        , callback = photoGroup();
      request.get({url:url}, function (err, resp, body) {
        if (err) {
          return callback(err);
        }
        body = JSON.parse(body).sizes.size;
        body = _.max(body, function (size) {
          return size.width * size.height;
        });

        var filename = 'images/' + count++;
        var child = child_process.exec('wget ' + body.source +' -O ' + filename, function (err, stdout, stderr) {
          if (err) {
            return callback(err);
          }

          gm(filename).size(function (err, size) {
            if (err) {
              return callback(err);
            }

            callback(null, {
              source: process.cwd() + '/' + filename,
              height: size.height,
              width: size.width
            });
          });
        });
      });
    }, this);
  },
  function (err, photos, music) {
    if (err) {
      throw (err);
    }

    var mlt = new MLT
      , multitrack = new MLT.Multitrack
      , tractor = new MLT.Tractor
      , transitionTime = 25
      , showTime = 100 + transitionTime * 2
      , mltFilename = './images/slideshow.mlt'
      , callback = this;

    //Process Audio
    music = new MLT.Producer.Audio({source: music});
    mlt.push(music);
    var music = (new MLT.Playlist()).entry({
      producer: music,
      length: (photos.length * showTime) - (photos.length-1) * transitionTime
    });
    mlt.push(music);
    multitrack.addTrack(new MLT.Multitrack.Track(music));

    //process slides
    _.each(photos, function (photo, k) {
      var producer = new MLT.Producer.Image({source: photo.source})
        , playlist = new MLT.Playlist();
      mlt.push(producer);

      if (k > 0) {
        playlist.blank(k * showTime - transitionTime * k);
      }

      var scale = {
        init: 1 + (Math.random() * 0.125),
        end: 1 + (Math.random() * 0.125)
      };

      playlist.entry({
        producer: producer,
        length: showTime /*,
        filters: [
          (new MLT.Filter.Affine).geometry([
            {
              frame: 0,
              x: parseInt(-photo.width * 0.25 * scale.init),
              y: parseInt(-photo.height * 0.25 * scale.init),
              w: parseInt(photo.width * scale.init),
              h: parseInt(photo.height * scale.init),
              sat: 100   
            },
            {
              frame: showTime - 1,
              x: parseInt(-(0.125 + 0.25*Math.random()) * photo.width * scale.end),
              y: parseInt(-(0.125 + 0.25*Math.random()) * photo.height * scale.end),
              w: parseInt(scale.end * photo.width),
              h: parseInt(scale.end * photo.height),
              sat: 100
            }
          ])
        ]*/
      });

      mlt.push(playlist);
      multitrack.addTrack(new MLT.Multitrack.Track(playlist));

      if (photos[k+1] !== undefined) { //have something to transition to
        tractor.push(new MLT.Transition.Luma({
          start: (k+1) * (showTime - transitionTime),
          length: transitionTime,
          to: k+2, //+1 to the index, because audio is #0
          from: k+1
        }));
      }
    });

    mlt.push(tractor.push(multitrack));

    fs.writeFile(mltFilename, mlt.toString({pretty:true}), function (err) {
      if (err) {
        return callback(err);
      }
      console.log('Finished prep...');
      callback(null,mltFilename);
    });
  },
  function (err, mltFilename) {
    if (err) {
      throw err;
    }

    var callback = this
      , kdenlive = config.kdenlive
      , videoFilename = './images/untitled.mp4'
    
    var child = kdenlive.renderer + ' ' + kdenlive.melt + ' '
      + kdenlive.avformat + ' avformat - ' + mltFilename + ' ' 
      + videoFilename + ' ' + kdenlive.options;

    console.log('Melting. Please be Patient!');
    child = child_process.exec(child, function (err, stdout, stderr) { 
      if (err) {
        return callback(err);
      }

      console.log('Finished: ' + videoFilename);
    });
  }
)

/*
var getResources = function (type, callback) {
  var dir = '/' + type + '/'

  fs.readdir('.' + dir, function(err, resources) {
    if (err) {
      return callback(err)
    }

    resources = _.map(resources.sort(), function (resource) {
      return process.cwd() + dir + resource
    })

    callback(null, resources);
  })
}


var mlt = new MLT
  , multitrack = new MLT.Multitrack
  , transitionTime = 25
  , showTime = 100 + transitionTime * 2
  , trackNumbers = []
  , trackNumber = 1

step(
  function () {
    getResources('images', this.parallel())
    getResources('audio', this.parallel())
  },
  function (err, images, audio) {
    if (err) {
      throw err
    }
    var group = this.group();

    //Process Audio
    audio = new MLT.Producer.Audio({
      source: _.first(
        _.sortBy(audio, function () {
          return Math.random()
        })
      )
    })
    mlt.push(audio)
    var audio = (new MLT.Playlist()).entry({
      producer:audio,
      length: (images.length * showTime) - (images.length-1) * transitionTime
    })
    mlt.push(audio)
    multitrack.addTrack(new MLT.Multitrack.Track(audio))
  
    //Process Images
    _.each(images, function(image, k, images) {
      var cb = group()
      gm(image).size(function (err, size) {
        if (err) {
          return cb(err, null)
        }

        return cb(null, {
          source: image,
          height: size.height,
          width: size.width
        })
      })
    })
  },
  function (err, images) {
    if (err) {
      throw err
    }

    var tractor = new MLT.Tractor

    _.each(images, function(image, k) {
      var producer = new MLT.Producer.Image({source: image.source})
        , playlist = new MLT.Playlist()
      mlt.push(producer)

      if (k > 0) {
        playlist.blank(k * showTime - transitionTime * k)
      }

      var scale = {
        init: 1 + (Math.random() * 0.125),
        end: 1 + (Math.random() * 0.125)
      }

      playlist.entry({
        producer: producer,
        length: showTime,
        filters: [
          (new MLT.Filter.Affine).geometry([
            {
              frame: 0,
              x: parseInt(-image.width * 0.25 * scale.init),
              y: parseInt(-image.height * 0.25 * scale.init),
              w: parseInt(image.width * scale.init),
              h: parseInt(image.height * scale.init),
              sat: 100   
            },
            {
              frame: showTime - 1,
              x: parseInt(-(0.125 + 0.25*Math.random()) * image.width * scale.end),
              y: parseInt(-(0.125 + 0.25*Math.random()) * image.height * scale.end),
              w: parseInt(scale.end * image.width),
              h: parseInt(scale.end * image.height),
              sat: 100
            }
          ])
        ]
      })

      mlt.push(playlist)
      multitrack.addTrack(new MLT.Multitrack.Track(playlist))

      if (images[k+1] !== undefined) { //have something to transition to
        tractor.push(new MLT.Transition.Luma({
          start: (k+1) * (showTime - transitionTime),
          length: transitionTime,
          to: k+2, //add 1 because music is track 0
          from: k+1
        }))
      }
    })

    mlt.push(tractor.push(multitrack))
 
    var filename = '/home/jeffrey/kdenlive/scripts/script003.sh.mlt'    
    fs.writeFile(filename, mlt.toString(), function () {
      console.log('WROTE: ' + filename)
      console.log('Compiling ...')

      var spawn = require('child_process').spawn

      compiler = spawn('/home/jeffrey/kdenlive/scripts/script003.sh', [])
      compiler.on('exit', function (code) {
        if (code === 0){
          console.log('... Finis!')
        }
        else {
          console.log('Something Funny Happened (Code ' + code + ')')
        }
      })
    })
  }
)
*/