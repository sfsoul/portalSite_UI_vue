import request from '@/utils/request'

/**
 * 获取全部的一级模块
 * @param params
 */
export function getParentModule() {
  return request({
    url: 'back/sysModule/getRootModules',
    method: 'get'
  })
}

export function getChildrenModuleByPid(params) {
  return request({
    url: 'back/sysModule/getChildModules',
    method: 'get',
    params
  })
}

export function getUserEnableParentModule() {
  return request({
    url: 'back/sysModule/getCurrentUserRootModules',
    method: 'get'
  })
}

export function getUserEnableChildrenModuleByPid(params) {
  return request({
    url: 'back/sysModule/getCurrentUserRootModules',
    method: 'get',
    params
  })
}

