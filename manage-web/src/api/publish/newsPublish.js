import request from '@/utils/request'

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
    id: id
  }
  return request({
    url: 'news/deleteNews',
    method: 'post',
    data: data
  })
}

export function isExistTitle(params) {
  return request({
    url: 'news/existTitle',
    method: 'get',
    params
  })
}

export default { add, edit, del }
