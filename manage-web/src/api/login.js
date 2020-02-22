import request from '@/utils/request'

const defaultHeaders = {
  'Content-Type': 'application/json;charset=utf-8'
}

export function login(username, passwd) {
  return request({
    url: 'back/user/signin',
    method: 'post',
    headers: defaultHeaders,
    data: {
      username,
      passwd
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/back/user/logout',
    method: 'get'
  })
}
