
console.log('***START TESTS***')

console.log('>>> XML INTERFACE <<<')
require('./interfaces/xml.js')
console.log('>>> PROPERTIES INTERFACE <<<')
require('./interfaces/properties.js')

console.log('### MLT MULTITRACK::TRACK ###')
require('./mlt/multitrack/track.js')

console.log('### MLT PLAYLIST::BLANK ###')
require('./mlt/playlist/blank.js')

console.log('### MLT PLAYLIST::ENTRY ###')
require('./mlt/playlist/entry.js')

console.log('### MLT FILTER ###')
require('./mlt/filter.js')

console.log('### MLT MULTITRACK ###')
require('./mlt/multitrack.js')

console.log('### MLT PLAYLIST ###')
require('./mlt/playlist.js')

console.log('### MLT PRODUCER ###')
require('./mlt/producer.js')

console.log('### MLT PROPERTY ###')
require('./mlt/property.js')

console.log('### MLT TRACTOR ###')
require('./mlt/tractor.js')

console.log('### MLT TRANSITION ###')
require('./mlt/transition/base.js')

console.log('### MLT TRANSITION LUMA ###')
require('./mlt/transition/luma.js')

console.log('### MLT TRANSITION COMPOSITE ###')
require('./mlt/transition/composite.js')

console.log('### MLT TRANSITION AFFINE ###')
require('./mlt/transition/affine.js')

console.log('### MLT TRANSITION MIX ###')
require('./mlt/transition/mix.js')

console.log('### MLT PROFILE ###')
require('./mlt/profile.js')


console.log('*** END TESTS ***')
