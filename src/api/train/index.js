import request from "@/utils/request"

export function getOrgTrains({current,pageSize}){
    return request({
        url:"train/getOrgTrains",
        method:"post",
        data:{
            current,
            pageSize
        }
    })
}

export function getOrgTrainDetail({articleid}){
    return request({
        url:"train/getOrgTrainDetail",
        method:"get",
        params:{
            articleid
        }
    })
}