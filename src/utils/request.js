import axios from 'axios'
import store from '@/store'
import config from '@/config'
import { Message,MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from  'vue-router'

const server = axios.create({
  timeout: 500000,
  baseURL: process.env.NODE_ENV === 'production' ? config.baseURL : '/api'
})

// 添加请求拦截

server.interceptors.request.use(
  config => {
   
    if(store.getters.token){
      config.headers['X-TOKEN'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
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
    const [data,code] = [response.data,response.status]
    
    if(code<200 || code >300){
      Message.error(`${response.message}`)
      return Promise.reject(response.message)
    }
    else {
      return Promise.resolve(data)
    }
  },
  error => {
    //错误处理
    let code = null
    try {
      code = error.response.states
    }catch(e){
      if (e.toString().indexOf('Error: timeout') !== -1) {
      Message({
        type: 'error',
        message: '网络请求超时',
        duration: 5000
      })
      return Promise.reject(error)
      }
    }
    if(code){
      switch(code){
        case '401':{
          MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            /* store.dispatch('user/').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }) */
            Message.info("重新登录")
          })
        };break;
        case '403':{
          router.push('/401')
        }
      }
    }
    
    return Promise.reject(error)
  }
)

export default server
