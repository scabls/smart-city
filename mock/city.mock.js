import buildings from '../src/assets/GeoJson/Wuhan_Buildings.json' assert { type: 'json' }
import roads from '../src/assets/GeoJson/Wuhan_roads.json' assert { type: 'json' }

export default [
  {
    pattern: '/api/buildings',
    method: 'GET',
    handle: (req, res) => {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(buildings))
    },
  },
  {
    pattern: '/api/roads',
    method: 'GET',
    handle: (req, res) => {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(roads))
    },
  },
]
