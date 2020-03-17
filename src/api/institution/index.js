import request from "@/utils/request"

export function getRegulations({current,pageSize,deptid}){
    return request({
        url:"regulations/getRegulations",
        method:"post",
        data:{
            current,
            pageSize,
            deptid
        }
    })
}

export function getRegulationsDetail({articleid}){
    return request({
        url:"regulations/getRegulationsDetail",
        method:"get",
        params:{
            articleid
        }
    })
}

export function getDepartMents(){
    return request({
        url:"back/settings/dept/getDepartMents",
        method:"get",
    })
}