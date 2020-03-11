
import { getToken } from "@/utils/auth"
/**
 * 判断是否是外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path){
    return  /^(https?:|mailto:|tel:)/.test(path)
}

export function isLogin(){
    let token = getToken()
    if(token && token !== undefined){
        return true
    }else{
        return false
    }
}