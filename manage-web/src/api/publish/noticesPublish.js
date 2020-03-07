import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'notice/addNotice',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'notice/updateNotice',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'notice/deleteNotice',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'notice/existTitle',
    method: 'get',
    params
  })
}

export function getNoticeDetail(id) {
  const params = {
    noticeid: id
  }
  return request({
    url: 'notice/getReviewInfo',
    method: 'get',
    params
  })
}

export function getNoticesContent(id) {
  const params = {
    noticeid: id
  }
  return request({
    url: 'notice/getNoticeDetail',
    method: 'get',
    params
  })
}

export default { add, edit, del }
