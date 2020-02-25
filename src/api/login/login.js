import request from '@/utils/request'


export function login (data){

    return request({
        url:'/back/user/signin',
        method:'post',
        data
    })
}

export function logout (){
    return request({
        url:'/back/user/logout',
        method:'get',
    })
}