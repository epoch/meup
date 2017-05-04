const { compose, concat, join, map, toPairs, split, tail, fromPairs } = require('ramda')

// qs :: object -> string
const toQs = compose(
  concat('?'), 
  join('&'), 
  map(join('=')), 
  toPairs)

const parseQs = compose(fromPairs, map(split('=')), split('&'), tail)

module.exports = {
  toQs,
  parseQs
}