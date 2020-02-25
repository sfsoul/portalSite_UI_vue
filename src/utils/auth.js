import Cookies from 'js-cookie'
import Config from '@/setting'


export function setToken({token,time}){
    return Cookies.set(Config.TokenKey,token,time)
}

export function getToken(){
    return Cookies.get(Config.TokenKey)
}

export function removeToken(){
    return Cookies.remove(Config.TokenKey)
}