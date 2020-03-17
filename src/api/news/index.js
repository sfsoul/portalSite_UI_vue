import request from '@/utils/request'

export function getNewList(current,pageSize){
    return request({
        url:'news/getNews',
        method:'post',
        data:{
            current,
            pageSize
        }
    })
}

export function getNewsDetail({newsid}){
    return request({
        url:'news/getNewsDetail',
        method:'get',
        params:{
            newsid
        }
    })
}