import { login,logout } from '@/api/login/login.js'
import {getToken,setToken,removeToken,getName,setName,removeName,getLoginStatue,setLoginStatue,removeLoginStatue} from '@/utils/auth.js'
import router,{resetRouter} from '@/router'
const state = {
    token:getToken(),
    name:getName(),
    avatar:'',
    roles:[],
    loginStatus:getLoginStatue() || false,
}

const mutations= {
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_NAME:(state,name)=>{
        state.name = name
    },
    SET_AVATAR:(state,avatar)=>{
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_LOGIN_STATUE:(state,loginStatus) => {
        state.loginStatus = loginStatus
    },
}

const actions = {
    login:({commit},userInfo) => {
        const { username,password } = userInfo
        return new Promise((resolve,reject)=>{
            login({username:username,passwd:password}).then((respone)=>{
                setToken(respone.token)
                commit('SET_NAME',respone.username)
                commit('SET_TOKEN',respone.token)
                commit('SET_AVATAR',respone.realname)
                commit('SET_LOGIN_STATUE',true)
                setLoginStatue(true)
                setName(respone.username)
                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
    },
    logout:({commit})=>{
        return new Promise((resolve,reject)=>{
            logout().then(()=>{
                commit('SET_NAME',"")
                commit('SET_TOKEN',"")
                commit('SET_AVATAR',"")
                commit('SET_LOGIN_STATUE',false)
                removeLoginStatue()
                removeName()
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
  }