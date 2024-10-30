/* eslint-disable no-undef */
const mockjs = require('mockjs')
const buildings = require('./GeoJson/Wuhan_Buildings.json')
const roads = require('./GeoJson/Wuhan_roads.json')

module.exports = () =>
  mockjs.mock({
    buildings,
    roads,
  })
