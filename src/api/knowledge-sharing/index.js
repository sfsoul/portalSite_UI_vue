import request from "@/utils/request"

//新增
export function addKnlgeShare({title,content,annexes}){
    return request({
        url:"knowledgeShare/addKnlgeShare",
        method:"post",
        data:{
            title,
            content,
            annexes
        }
    })
}
//修改
export function updateKnlgeShare(data){
    return request({
        url:"knowledgeShare/updateKnlgeShare",
        method:"post",
        data
    })
}
//删除单个
export function deleteKnlgeShare(id){
    return request({
        url:"knowledgeShare/deleteKnlgeShare",
        method:"post",
        data:{
            id
        }
    })
}
//标题是否重复
export function isExistTitle(title){
    return request({
        url:"knowledgeShare/existTitle",
        method:"get",
        params:{
            title
        }
    })
}
//分页获取当前用户发布列表
export function getCurrentUserShares({current,pageSize}){
    return request({
        url:"knowledgeShare/getCurrentUserShares",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}

//游客分页获取经验分享列表

export function getKnlgeShares({current,pageSize}){
    return request({
        url:"knowledgeShare/getKnlgeShares",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}
//获取分享详情
export function getKnlgeShareDetail({articleid,type}){
    return request({
        url:"knowledgeShare/getKnlgeShareDetail",
        method:"get",
        params:{
            articleid,
            type
        }
    })
}

//获取精华帖列表
export function getGoodKnlgeShares({current,pageSize}){
    return request({
        url:"knowledgeShare/getGoodKnlgeShares",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}