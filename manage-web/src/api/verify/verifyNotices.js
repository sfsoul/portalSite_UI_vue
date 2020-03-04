import request from '@/utils/request'

export function reviewNotices(id, form) {
  const data = {
    id: id,
    reviewstatus: form.reviewstatus,
    reviewComment: form.reviewComment
  }
  return request({
    url: 'notice/reviewNotice',
    method: 'post',
    data: data
  })
}

