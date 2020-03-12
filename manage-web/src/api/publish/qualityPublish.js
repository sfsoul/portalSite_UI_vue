import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'quality/addQuality',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'quality/updateQuality',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'quality/deleteQuality',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'quality/existTitle',
    method: 'get',
    params
  })
}

export function getQualityContent(id) {
  const params = {
    articleid: id
  }
  return request({
    url: 'quality/getQualityDetail',
    method: 'get',
    params
  })
}

export default { add, edit, del }
