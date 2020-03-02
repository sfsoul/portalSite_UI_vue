import request from '@/utils/request'

export function getUserEnableRootMenu() {
  return request({
    url: 'back/sysModule/getCurrentUserRootModules',
    method: 'get'
  })
}

export function getUserEnableChildrenMenuByPid(moduleid) {
  const params = {
    moduleid: moduleid
  }
  return request({
    url: 'back/sysModule/getCurrentUserChildModules',
    method: 'get',
    params
  })
}
