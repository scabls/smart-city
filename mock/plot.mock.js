import mockjs from 'mockjs'

// 统一设置响应头

export default [
  {
    pattern: '/api/travelPopulation',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|5': [
          {
            name: '@county()',
            population: '@integer(10000, 50000)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
  {
    pattern: '/api/bus',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|5': [
          {
            name: '@county()',
            bus: '@integer(10000, 50000)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
  {
    pattern: '/api/population',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|5': [
          {
            name: '@county()',
            population: '@integer(10000, 50000)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
]
