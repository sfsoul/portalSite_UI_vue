import request from '@/utils/request'
import Long from 'long'

export function add(data) {
  return request({
    url: 'train/addOrgTrain',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: 'train/updateOrgTrain',
    method: 'post',
    data
  })
}

export function del(id) {
  const data = {
    id: (Long.fromValue(id)).toString()
  }
  return request({
    url: 'train/deleteOrgTrain',
    method: 'post',
    data: data
  })
}

export function isExistTitle(title) {
  const params = {
    title: title
  }
  return request({
    url: 'train/existTitle',
    method: 'get',
    params
  })
}

export function getTrainDetail(id) {
  const params = {
    articleid: id
  }
  return request({
    url: 'train/getOrgTrainDetail',
    method: 'get',
    params
  })
}

export function getTrainContent(id) {
  const params = {
    articleid: id
  }
  return request({
    url: 'train/getOrgTrainDetail',
    method: 'get',
    params
  })
}

export default { add, edit, del }
