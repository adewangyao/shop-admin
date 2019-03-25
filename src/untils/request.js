import axios from 'axios'
import router from '../../router'

const request = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    router.replace('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
