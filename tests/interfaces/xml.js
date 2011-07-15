var assert = require('assert')
  , _ = require('underscore')

var XMLObj = function (params) {
  this._node = params.node
  this._attribs = params.attribs
  this._inner = params.inner
}

XMLObj.prototype = _.extend(XMLObj.prototype, require('../../lib/interfaces/xml.js'))

var produce = new XMLObj({
  node: 'Produce',
  attribs: {
    healthy: 'yes',
    tasty: 'often',
    vegetarian: 'yes'
  },
  inner: [
    new XMLObj({
      node: 'banana',
      attribs: {
        'source.of': 'potassium'
      },
      inner: 'bananas are good' 
    }),
    new XMLObj({
      node: 'orange',
      attribs: {
        'source.of': 'vitamin c'
      },
      inner: 'oranges are ok'
    })
  ]
})

var food = {}

food.obj = new XMLObj({
  node: 'Food',
  attribs: {
    edible: 'true'
  },
  inner: {
    'produce': produce,
    'fish': new XMLObj({
      node: 'fish'
    }),
    'meat' : new XMLObj({
      node: 'meat'
    })
  }
})

food.xml = '<Food edible="true"><Produce healthy="yes" tasty="often" vegetarian="yes"><banana source.of="potassium">bananas are good</banana><orange source.of="vitamin c">oranges are ok</orange></Produce><fish/><meat/></Food>';
food.prettyXml = "<Food edible=\"true\">\n  \n  <Produce healthy=\"yes\" tasty=\"often\" vegetarian=\"yes\">\n    \n    <banana source.of=\"potassium\">\n      bananas are good\n    </banana>\n    \n    <orange source.of=\"vitamin c\">\n      oranges are ok\n    </orange>\n    \n  </Produce>\n  \n  <fish/>\n  \n  <meat/>\n  \n</Food>\n";

assert.equal(food.obj.toString(), food.xml, 'Raw XML generation malformed')
assert.equal(food.obj.toString({pretty:true}), food.prettyXml, "Pretty Printed XML generation malformed")

assert.throws(function () {
    cereal = new XMLObj({})
    cereal.toString()
  },
  Error
)