const baseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // baseUrl，
    baseApi: baseUrl,
    // 图片上传
    imagesUploadApi: baseUrl + '/api/files/upload'
  }
}

export default api
