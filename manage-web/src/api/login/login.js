import request from '@/utils/request'

export function login(username, passwd) {
  return request({
    url: 'back/user/signin',
    method: 'post',
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
