import request from '@/utils/request'

/**
 * 分页获取通知公告列表
 * @param {Number} current 分页数
 * @param {Number} pageSize 分页大小
 */
export function getNoticeList(current,pageSize){
    return request({
        url:'notice/getNotices',
        method:'post',
        data:{
            current,
            pageSize
        }
    })
}

/**
 * 获取通知公告详情
 * @param {} noticeid 公告id
 */
export function getNoticeDetail({noticeid}){
    return request({
        url:'notice/getNoticeDetail',
        method:'get',
        params:{
            noticeid
        }
    })
}