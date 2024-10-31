import request from './request-jsonSever'

const getBridges = () => request.get('/bridges')

export { getBridges }
