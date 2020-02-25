import { login,logout } from '@/api/login/login.js'
import {getToken,setToken,removeToken} from '@/utils/auth.js'

const state = {
    token:getToken(),
    name:'',
    avatar:'',
    roles:[],
    loginStatus:false,
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
    }
}

const actions = {
    login:({commit},userInfo) => {
        const { username,password } = userInfo
        return new Promise((resolve,reject)=>{
            login({username:username,passwd:password}).then((respone)=>{
                console.log(respone)
                setToken(respone.token)
                
                commit('SET_NAME',respone.username)
                commit('SET_AVATAR',respone.realname)
                commit('SET_LOGIN_STATUE',true)
                resolve()
            }).catch(error=>{
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