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
  , showTime = 100
  , transitionTime = 25
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
      length: showTime * images.length
    })
    mlt.push(audio)
    multitrack.addTrack(new MLT.Multitrack.Track(audio))
  
    //Process Images
    _.each(images, function(image, k, images) {
      var cb = group()
        , playlist = new MLT.Playlist()

      gm(image).size(function (err, size) {
        if (err) {
          return cb(err, null)
        }

        image = new MLT.Producer.Image({ source: image })
        mlt.push(image)

        if (k > 0) {
          playlist.blank( k * showTime)
        }

        var scale = {
          init: 1 + (Math.random() * 0.125),
          end: 1 + (Math.random() * 0.125)
        } 

        playlist.entry({
          producer: image,
          length: showTime,
          filters: [
            (new MLT.Filter.Affine({
               
            })).geometry([
              {
                frame: 0,
                x: parseInt(-size.width * 0.25 * scale.init),
                y: parseInt(-size.height * 0.25 * scale.init),
                w: parseInt(size.width * scale.init),
                h: parseInt(size.height * scale.init),
                sat: 100   
              },
              {
                frame: showTime - 1,
                x: parseInt(-(0.125 + 0.25*Math.random()) * size.width * scale.end),
                y: parseInt(-(0.125 + 0.25*Math.random()) * size.height * scale.end),
                w: parseInt(scale.end * size.width),
                h: parseInt(scale.end * size.height),
                sat: 100  
              }
            ])
          ]
        })

        multitrack.addTrack(new MLT.Multitrack.Track(playlist))

        mlt.push(playlist)
        cb()
      })
    }, this)
  },
  function (err) {
    if (err) {
      throw err
    }

    //Throw it all together
    var tractor = new MLT.Tractor()
    mlt.push(tractor.push(multitrack))
    console.log(mlt.toString({pretty: true}))
  }
)