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

export function getUserList(params) {
  return request({
    url: 'back/user/lists',
    method: 'get',
    params
  })
}

export function adduser(form) {
  const data = {
    username: form.username,
    realname: form.realname,
    passwd: form.passwd
  }
  return request({
    url: 'back/user/add',
    method: 'put',
    data
  })
}

export function updateuser(form) {
  const data = {
    id: form.id,
    username: form.username,
    realname: form.realname,
    roleid: form.roleid
  }
  return request({
    url: 'back/user/update',
    method: 'post',
    data
  })
}
