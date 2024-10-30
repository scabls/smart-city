import request from './request'

const getBuildings = () => request.get('/buildings')

const getRoads = () => request.get('/roads')

export { getBuildings, getRoads }
