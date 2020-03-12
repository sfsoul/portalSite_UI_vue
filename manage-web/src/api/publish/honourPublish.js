import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'honour/addHonour',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'honour/updateHonour',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'honour/deleteHonour',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'honour/existTitle',
    method: 'get',
    params
  })
}

export function getHonourContent(id) {
  const params = {
    articleid: id
  }
  return request({
    url: 'honour/getHonourDetail',
    method: 'get',
    params
  })
}

export default { add, edit, del }
