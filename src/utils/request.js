import axios from 'axios'
import store from '@/store'
import config from '@/config'


const server = axios.create({
  timeout: 500000,
  baseURL: config.baseURL
})

// 添加请求拦截

server.interceptors.request.use(
  config => {
    // 请求配置处理
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截
server.interceptors.response.use(
  response => {
    // 响应数据处理

    return Promise.resolve(response)
  },
  error => {
    //错误处理

    return Promise.reject(error)
  }
)

export default server
