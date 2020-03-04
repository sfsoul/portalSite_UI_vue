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
  const data = {
    // fid: (Long.fromValue(picture.fid)).toString()
    path: picture.path,
    name: picture.name
  }
  return request({
    url: 'files/delete',
    method: 'post',
    data: data
  })
}
