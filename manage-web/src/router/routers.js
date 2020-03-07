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
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index', affix: true, noCache: true }
    }]
  },
  {
    path: '/publish',
    component: Layout,
    redirect: '/publish/news',
    name: '内容发布',
    meta: { title: '内容发布', icon: 'publish' },
    children: [
      {
        path: 'news',
        name: '新闻发布',
        component: () => import('@/views/publish/news/index'),
        meta: { title: '新闻发布', icon: 'newspublish', noCache: true }
      },
      {
        path: 'notice',
        name: '通告发布',
        component: () => import('@/views/publish/notice/index'),
        meta: { title: '通告发布', icon: 'noticepublish', noCache: true }
      },
      {
        path: 'train',
        name: '培训发布',
        component: () => import('@/views/publish/train/index'),
        meta: { title: '培训发布', icon: 'trainpublish', noCache: true }
      },
      {
        path: 'institution',
        name: '制度文档',
        component: () => import('@/views/publish/institution/index'),
        meta: { title: '制度文档', icon: 'institution', noCache: true }
      },
      {
        path: 'quality',
        name: '质量建设',
        component: () => import('@/views/publish/quality/index'),
        meta: { title: '质量建设', icon: 'quality', noCache: true }
      },
      {
        path: 'honor',
        name: '荣誉管理',
        component: () => import('@/views/publish/honor/index'),
        meta: { title: '荣誉管理', icon: 'honor', noCache: true }
      }
    ]
  },
  {
    path: '/verify',
    component: Layout,
    redirect: '/verify/news',
    name: '内容审核',
    meta: { title: '内容审核', icon: 'content' },
    children: [
      {
        path: 'news',
        name: '新闻审核',
        component: () => import('@/views/verify/news/index'),
        meta: { title: '新闻审核', icon: 'newsverify', noCache: true }
      },
      {
        path: 'notice',
        name: '通告审核',
        component: () => import('@/views/verify/notice/index'),
        meta: { title: '通告审核', icon: 'noticeverify', noCache: true }
      },
      {
        path: 'share',
        name: '分享审核',
        component: () => import('@/views/verify/share/index'),
        meta: { title: '分享审核', icon: 'shareverify', noCache: true }
      },
      {
        path: 'comment',
        name: '评论审核',
        component: () => import('@/views/verify/comment/index'),
        meta: { title: '评论审核', icon: 'comment', noCache: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'newsType',
        name: '新闻类型',
        component: () => import('@/views/system/news/index'),
        meta: { title: '新闻类型', icon: 'news', noCache: true }
      },
      {
        path: 'noticeType',
        name: '通告类型',
        component: () => import('@/views/system/notice/index'),
        meta: { title: '通告类型', icon: 'notice', noCache: true }
      },
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
