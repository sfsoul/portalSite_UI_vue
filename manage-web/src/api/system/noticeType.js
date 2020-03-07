import request from '@/utils/request'

export function getNoticesType(data) {
  return request({
    url: 'back/settings/noticeType/getTypes',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: 'back/settings/noticeType/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'back/settings/noticeType/update',
    method: 'post',
    data: data
  })
}

export default { add, edit }
