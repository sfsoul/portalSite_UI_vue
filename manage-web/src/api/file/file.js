import request from '@/utils/request'

export function fileUpload(data) {
  return request({
    url: 'files/upload',
    method: 'post',
    data
  })
}

export function fileDownload(data) {
  return request({
    url: 'files/download',
    method: 'post',
    data: data
  })
}

export function fileDel(data) {
  return request({
    url: 'files/delete',
    method: 'post',
    data: data
  })
}
