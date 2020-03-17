import request from "@/utils/request"

/**
 * 
 * @param {*Number} current 页数
 * @param {Number} pageSize 分页大小
 * @param { Number } articletype 类型
 * @param { String } fastsearch 快速检索字符串
 */
export function searchArticles({current,pageSize,articletype,fastsearch }){
    return request({
        url:"search/searchArticles",
        method:"post",
        data:{
            current,
            pageSize,
            articletype,
            fastsearch
        }
    })
}