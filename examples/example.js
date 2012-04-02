var fs = require('fs')
  , child_process = require('child_process')
  , querystring = require('querystring')
  , _ = require('underscore')
  , step = require('step')
  , request = require('request')
  , gm = require('gm')
  , MLT = require('../lib/mlt')
  , config = require('./config.js')
  , flickrUrl = 'http://api.flickr.com/services/rest/?'
  , flickrQueryDefaults = {
    format: 'json',
    nojsoncallback: '1',
    api_key: config.flickr.apiKey
  }
step(
  function () { //Search Flickr by keyword
    var callback = this
      , flickrQueryString = _.extend({}, flickrQueryDefaults);

    if (process.argv[2] === '-s' || process.argv[2] === '--search') {
      flickrQueryString.method = 'flickr.photos.search';
      flickrQueryString.license = '7';
      flickrQueryString.text = process.argv[3];

      callback(null, querystring.stringify(flickrQueryString));
    }
    else if (process.argv[2] === '-g' || process.argv[2] === '--gallery') {
      flickrQueryString.method = 'flickr.urls.lookupGallery';
      flickrQueryString.url = process.argv[3];
      flickrQueryString = querystring.stringify(flickrQueryString);
      request.get({url: flickrUrl + flickrQueryString}, function (err, req, body) {
        if (err) {
          return callback(err);
        }

        body = JSON.parse(body);

        if (body.stat == 'fail') {
          console.log(body.message);
          process.exit();
        }

        flickrQueryString = _.extend({
          method: 'flickr.galleries.getPhotos',
          gallery_id: body.gallery.id
        }, flickrQueryDefaults);

        callback(null, querystring.stringify(flickrQueryString));
      });
    }
    else if (process.argv[2] === '-p' || process.argv[2] === '--photoset') {
      flickrQueryString.method = 'flickr.photosets.getPhotos';
      flickrQueryString.photoset_id = process.argv[3];
      callback(null, querystring.stringify(flickrQueryString));
    }
    else {
      console.log ('Usage:\n\t\t-s/--search {keyword}\n\t\t\tSearch by keyword\n\t\t-g/--gallery {gallery URL}\n\t\t\tCreate from a gallery\n\t\t-p/--photoset {photoset ID}\n\t\t\tCreate from a photoset');
      process.exit();
    }
  },
  function (err, flickrQueryString) {
    if (err) {
      throw err;
    }
    var callback = this;

    request.get({url: flickrUrl + flickrQueryString}, function (err, resp, body) {
      if (err) {
        return callback(err);
      }
      body = JSON.parse(body);
      
      if (body.stat === 'fail') {
        console.log(body.message);
        process.exit();
      }

      body.photos = body.photos || body.photoset;

      console.log(body.photos.total + ' Photos Found on Flickr');
      if (body.photos.total === '0') {
        console.log('Cannot do a slideshow without photos. Sorry.');
        process.exit();
      }
      else if (body.photos.total > 25) {
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
      var callback = photoGroup();
      var flickrQueryString = _.extend({
        method: 'flickr.photos.getSizes',
        photo_id: photo.id
      }, flickrQueryDefaults);

      flickrQueryString = querystring.stringify(flickrQueryString);
      request.get({url: flickrUrl + flickrQueryString}, function (err, resp, body) {
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
      , child = 'melt ' + mltFilename + ' -consumer avformat:' + videoFilename;

    if (config.ffmpeg && config.ffmpeg.options) {
      _.each(config.ffmpeg.options, function (value, key) {
        child += ' ' + key + '=' + value;
      });
    }

    console.log('Melting. Please be Patient!');
    child = child_process.exec(child, function (err, stdout, stderr) { 
      if (err) {
        return callback(err);
      }

      console.log('Finished: ' + videoFilename);
    });
  }
);
