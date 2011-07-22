var fs = require('fs')
  , step = require('step')
  , _ = require('underscore')
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

step(
  function () {
    getResources('images', this.parallel())
    getResources('audio', this.parallel())
  },
  function (err, images, audio) {
    if (err) {
      throw err
    }
    var mlt = new MLT
      , showTime = 100
      , multitrack = new MLT.Multitrack

    //Process Images
    _.each(images, function(image, k, images) {
      var playlist = new MLT.Playlist()

      image = new MLT.Producer.Image({ source: image }) 
      mlt.push(image)

      if (k > 0) {
        playlist.blank( k * showTime)
      }
      playlist.entry({
        producer: image,
        length: showTime
      })

      multitrack.addTrack(new MLT.Multitrack.Track(playlist))

      mlt.push(playlist)
    })

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

    //Throw it all together
    var tractor = new MLT.Tractor()
    mlt.push(tractor.push(multitrack))

    console.log(mlt.toString({pretty: true}))
  }
)