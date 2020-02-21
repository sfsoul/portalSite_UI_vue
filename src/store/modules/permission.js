import { asyncRoutes,constantRouter } from '@/router'

/**
 * 判断是否有权限
 * @param {Array} roles 当前角色权限信息 
 * @param {Array} route 当前路由信息
 * @return {Boolean} 当前角色是否拥有当前路由的权限
 */
function hasPermission(roles,route){
    if(route.meta && route.meta.roles){
      
        return roles.some(role=> route.meta.roles.includes(role))
    }else{
        return true
    }
}

/**
 * 遍历路由 寻找满足权限的路由
 * @param {Array} routes 
 * @param {Array} roles 
 */

export function filterAsyncRoutes(routes,roles){
    const res = []

    routes.forEach(route => {
        const tmp = {...route}
        if(hasPermission(roles,tmp)){
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
       
    });

    return res;
}

const state ={
    routes:[],
    addRoutes:[]
}
const mutations = {
    SET_ROUTES:(state,routes)=>{
        state.addRoutes = routes
        state.routes = constantRouter.concat(routes)
    }
}
const actions = {
    generateRoutes({commit},roles){
   
        return new Promise(resolve=>{
            let accessedRoutes
            if(roles.includes('admin')){
                accessedRoutes = asyncRoutes || []
            }else{
                accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
            }
            commit('SET_ROUTES',accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}