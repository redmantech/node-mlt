
console.log('***START TESTS***')

console.log('>>> XML INTERFACE <<<')
require('./interfaces/xml.js')
console.log('>>> PROPERTIES INTERFACE <<<')
require('./interfaces/properties.js')

console.log('### MLT PROPERTY ###')
require('./mlt/property.js')

console.log('### MLT PRODUCER ###')
require('./mlt/producer.js')

console.log('### MLT PLAYLIST::BLANK ###')
require('./mlt/playlist/blank.js')

console.log('### MLT PLAYLIST::ENTRY ###')
require('./mlt/playlist/entry.js')

console.log('*** END TESTS ***')
