import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'back/sysRole/add',
    method: 'put',
    data
  })
}

export function del(id) {
  const params = {
    id: id
  }
  return request({
    url: 'back/sysRole/delete',
    method: 'delete',
    params
  })
}

export function getRoleUnEnableRootMoudles(roleid) {
  const params = {
    roleid: roleid
  }
  return request({
    url: 'back/sysRole/specRoleUnEnableRootMoudles',
    method: 'get',
    params
  })
}

export function getRoleUnEnableChildMoudles(roleid, pid) {
  const params = {
    roleid: roleid,
    moduleid: pid
  }
  return request({
    url: 'back/sysRole/specRoleUnEnableChildMoudles',
    method: 'get',
    params
  })
}

export function getRoleEnableMoudles(roleid) {
  const params = {
    roleid: roleid
  }
  return request({
    url: 'back/sysRole/specRoleEnableMoudles',
    method: 'get',
    params
  })
}

export function bindRoleMoudle(roleid, moudleid) {
  const data = {
    roleid: roleid,
    moudleid: moudleid
  }
  return request({
    url: 'back/sysRole/bindSpecRoleMoudle',
    method: 'post',
    data: data
  })
}

export function unBindRoleMoudle(roleid, moudleid) {
  const data = {
    roleid: roleid,
    moudleid: moudleid
  }
  return request({
    url: 'back/sysRole/unBindSpecRoleMoudle',
    method: 'post',
    data: data
  })
}

export default { add, del }
