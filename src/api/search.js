import request from './request-jsonSever'

const getEvents = () => request.get('/trafficEvents')

export { getEvents }
