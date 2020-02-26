import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: 'back/sysRole/lists',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'back/sysRole/add',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'back/sysRole/delete',
    method: 'delete',
    data: id
  })
}

export default { add, del }
