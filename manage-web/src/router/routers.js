import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/features/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/features/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/features/redirect')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index', affix: true, noCache: true }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'peoples', noCache: true }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'role', noCache: true }
      },
      {
        path: 'permission',
        name: '权限管理',
        component: () => import('@/views/system/permission/index'),
        meta: { title: '权限管理', icon: 'permission', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
