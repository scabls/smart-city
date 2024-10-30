import request from './request-mock'

const getTravelPopulation = () => request.get('/travelPopulation')

const getBus = () => request.get('/bus')

const getPopulation = () =>
  request({
    url: '/population',
    method: 'GET',
  })

export { getTravelPopulation, getBus, getPopulation }
