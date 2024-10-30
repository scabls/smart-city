import request from './request-jsonSever'

const getBuildings = () => request.get('/buildings')

const getRoads = () => request.get('/roads')

export { getBuildings, getRoads }
