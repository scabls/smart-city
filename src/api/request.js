import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5173/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
)

export default instance
