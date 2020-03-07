import request from "@/utils/request"

//新增
export function addKnlgeShare({title,contentStr,annexes}){
    return request({
        url:"knowledgeShare/addKnlgeShare",
        method:"post",
        data:{
            title,
            contentStr,
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
export function deleteKnlgeShare(){
    return request({
        url:"knowledgeShare/deleteKnlgeShare",
        method:"post",
        data
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