import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'regulations/addRegulations',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'regulations/updateRegulations',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'regulations/deleteRegulations',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'regulations/existTitle',
    method: 'get',
    params
  })
}

export function getInstitutionContent(id) {
  const params = {
    articleid: id
  }
  return request({
    url: 'regulations/getRegulationsDetail',
    method: 'get',
    params
  })
}

export function getDeptList() {
  return request({
    url: '/back/settings/dept/getDepartMents',
    method: 'get'
  })
}

export default { add, edit, del }
