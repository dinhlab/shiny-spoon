import axios from 'axios'
import { BACKEND_API } from './config'
const api = axios.create({
  baseURL: BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
})
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request)
    return request
  },
  function (error) {
    console.log('REQUEST ERROR', error)
  }
)
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  function (error) {
    error = error.response.data
    console.log('RESPONSE ERROR', error)
    return Promise.reject(new Error(error.split('\n')[0]))
  }
)
export default api
