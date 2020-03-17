import axios from 'axios'
import store from '@/store'
import config from '@/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message,MessageBox } from 'element-ui'
import { getToken,removeToken } from '@/utils/auth'
import router,{resetRouter} from  'vue-router'
import docSetting from '@/setting'

const server = axios.create({
  timeout: docSetting.timeout,
  baseURL:'/portalSite'
})

// 添加请求拦截
server.interceptors.request.use(
  config => {
    NProgress.start()
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
    NProgress.done()
    if(code<200 || code >300){
      Message.error(`${response.message}`)
      return Promise.reject(response.message)
    }
    else {
      return Promise.resolve(data)
    }
  },
  error => {
    NProgress.done()
    //错误处理
    let code = null
    try {
      code = error.response.status
     
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
        case 601:{
          console.log(code)
          MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/logout').then(() => {
              resetRouter()
            })
            Message.info("重新登录")
          })
        };break;
        case 602:{
            Message.error(error.response.data)
        };break;
        case 403:{
          router.push('/401')
        };break;
        case 404:{
          Message.error('页面丢失了')
          router.push('/404')
        };break;
        default:{
          const errmsg = error.response;
          if(errmsg !== undefined){
            Message({
              type: 'error',
              message: errorMsg,
              duration: 5000
            })
          }
        }
      }
    }else{
      Message({
        type: 'error',
        message: '接口请求失败',
        duration: 5000
      })
    }
    
    return Promise.reject(error)
  }
)

export default server
