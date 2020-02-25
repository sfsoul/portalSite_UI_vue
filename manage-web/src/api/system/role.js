import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/back/sysRole/lists',
    method: 'get',
    params
  })
}
