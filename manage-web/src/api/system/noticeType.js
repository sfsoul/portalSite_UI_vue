import request from '@/utils/request'

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
