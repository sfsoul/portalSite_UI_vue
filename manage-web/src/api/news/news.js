import request from '@/utils/request'

export function getNewsList(data) {
  return request({
    url: '/news/getNews',
    method: 'post',
    data
  })
}
