/* eslint-disable no-undef */
const mockjs = require('mockjs')
const buildings = require('./GeoJson/Wuhan_Buildings.json')
const roads = require('./GeoJson/Wuhan_roads.json')
const trafficEvents = require('./GeoJson/Wuhan_events.json')
const bridges = require('./GeoJson/Wuhan_bridge.json')

module.exports = () =>
  mockjs.mock({
    buildings,
    roads,
    trafficEvents,
    bridges,
  })
