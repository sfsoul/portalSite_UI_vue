import Cookies from 'js-cookie'
import Config from '@/setting'
import config from '@/config'


export function setToken(token,time){
    return Cookies.set(Config.TokenKey,token,time)
}

export function getToken(){
    return Cookies.get(Config.TokenKey)
}

export function removeToken(){
    return Cookies.remove(Config.TokenKey)
}

export function setName(name){
    return Cookies.set(Config.userName,name)
}

export function getName(){
    console.log(Config.userName)
    return Cookies.get(Config.userName)
}
export function removeName(){
    return Cookies.remove(Config.userName)
}

export function getLoginStatue(){
    return Cookies.get(Config.LoginStatue)
}
export function setLoginStatue(LoginStatue){
    return Cookies.set(Config.LoginStatue,LoginStatue)
}
export function removeLoginStatue(){
    return Cookies.remove(Config.LoginStatue)
}