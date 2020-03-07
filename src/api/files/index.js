import request from '@/utils/request'
// import Long from 'long'

export function fileUpload(data) {
  return request({
    url: 'files/upload',
    method: 'post',
    data: data
  })
}

export function fileDelete(picture) {
  return request({
    url: 'files/delete',
    method: 'post',
    data: {
        path: picture.path,
       name: picture.name
    }
  })
}
