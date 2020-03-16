import request from "@/utils/request"

export function getQualitys({current,pageSize}){
    return request({
        url:"quality/getQualitys",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}

export function getQualityDetail({articleid}){
    return request({
        url:"quality/getQualityDetail",
        method:"get",
        params:{
            articleid
        }
    })
}