import request from '@/utils/request'

export function getNewsType(data) {
  return request({
    url: 'back/settings/newsType/getTypes',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: 'back/settings/newsType/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'back/settings/newsType/update',
    method: 'post',
    data: data
  })
}

export default { add, edit }
