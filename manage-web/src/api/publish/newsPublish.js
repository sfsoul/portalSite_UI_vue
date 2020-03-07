import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'news/addNews',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'news/updateNews',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'news/deleteNews',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'news/existTitle',
    method: 'get',
    params
  })
}

export function getNewsDetail(id) {
  const params = {
    newsid: id
  }
  return request({
    url: 'news/getReviewInfo',
    method: 'get',
    params
  })
}

export function getNewsContent(id) {
  const params = {
    newsid: id
  }
  return request({
    url: 'news/getNewsDetail',
    method: 'get',
    params
  })
}

export default { add, edit, del }
