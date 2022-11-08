'use strict'

const isOlsonTimezone = require('../lib').isOlsonTimezone
const test = require('tap').test

test('isOlsonTimezone: should return false if it is not a string', t => {
  t.plan(2)
  t.equal(isOlsonTimezone(42), false)
  t.equal(isOlsonTimezone(null), false)
})

test('isOlsonTimezone: should return false if it is not a OlsonTimezone', t => {
  t.plan(1)
  t.equal(isOlsonTimezone('Europe/Leipzig'), false)
})

test('isOlsonTimezone: should return true if it is a OlsonTimezone', t => {
  t.plan(1)
  t.equal(isOlsonTimezone('Europe/Berlin'), true)
})
