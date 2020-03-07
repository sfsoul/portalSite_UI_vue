import request from '@/utils/request'

export function reviewComment(id, form) {
  const data = {
    id: id,
    reviewstatus: form.reviewstatus,
    reviewComment: form.reviewComment
  }
  return request({
    url: 'comment/reviewComment',
    method: 'post',
    data: data
  })
}

export function getVerifyDetail(id) {
  const params = {
    commentid: id
  }
  return request({
    url: 'comment/getReviewInfo',
    method: 'get',
    params
  })
}

export function del(id) {
  const data = {
    id: id
  }
  return request({
    url: 'comment/deleteComment',
    method: 'post',
    data: data
  })
}

export default { del }
