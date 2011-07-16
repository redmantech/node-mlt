
console.log('***START TESTS***')

console.log('>>> XML INTERFACE <<<')
require('./interfaces/xml.js')
console.log('>>> PROPERTIES INTERFACE <<<')
require('./interfaces/properties.js')

console.log('### MLT PROPERTY ###')
require('./mlt/property.js')

console.log('### MLT PRODUCER ###')
require('./mlt/producer.js')

console.log('*** END TESTS ***')
