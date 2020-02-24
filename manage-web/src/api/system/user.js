import request from '@/utils/request'

export function updatePass(user) {
  const data = {
    passwd: user.newPass
  }
  return request({
    url: 'back/user/updatePasswd',
    method: 'post',
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
    data
  })
}

