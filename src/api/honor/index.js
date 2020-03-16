import request from "@/utils/request"

export function getHonours({current,pageSize}){
    return request({
        url:"honour/getHonours",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}


export function getHonourDetail({articleid}){
    return request({
        url:"honour/getHonourDetail",
        method:"get",
        params:{
            articleid
        }
    })
}