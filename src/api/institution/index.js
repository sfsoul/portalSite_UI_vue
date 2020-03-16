import request from "@/utils/request"

export function getRegulations({current,pageSize}){
    return request({
        url:"regulations/getRegulations",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}

export function getRegulationsDetail({articleid}){
    return request({
        url:"regulations/getRegulationsDetail",
        method:"post",
        params:{
            articleid
        }
    })
}