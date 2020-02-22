const modeUrlObject = {
  // 生产环境
  'production': {
    baseURL: 'http://',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'http://',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'http://',
    authBaseURL: ''
  }
}

export default modeUrlObject[process.env.NODE_ENV]
