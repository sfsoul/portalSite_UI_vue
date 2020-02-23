import request from '@/utils/request'

const defaultHeaders = {
  'Content-Type': 'application/json;charset=utf-8'
}

export function updatePass(user) {
  const data = {
    passwd: user.newPass
  }
  return request({
    url: 'back/user/updatePasswd',
    method: 'post',
    headers: defaultHeaders,
    data
  })
}

export function validatePass(user) {
  const data = {
    passwd: user.oldPass
  }
  return request({
    url: 'back/user/validate',
    method: 'post',
    headers: defaultHeaders,
    data
  })
}

