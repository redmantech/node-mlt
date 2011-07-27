var fs = require('fs')
  , _ = require('underscore')
  , gm = require('gm')
  , step = require('step')
  , MLT = require('../lib/mlt')

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
    })
  }
)