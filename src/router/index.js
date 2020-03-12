import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//主页

import Layout from '@/layout'


export const constantRouter = [
    {
        path:'/401',
        component:()=>import('@/views/error/401'),
        hidden:true,

    },
    {
        path:'/404',
        component:()=>import('@/views/error/404'),
        hidden:true,
        
    },
    {
        path:'/',
        component:Layout,
        redirect:'/home',
        children:[{
            path:'home',
            name:'home',
            component:()=>import('@/views/home/Home'),
            meta:{title:'首页'}
        },
        {
            path:'news-show',
            component:()=>import('@/views/news/news-show'),
            meta:{title:'新闻详情'},
            hidden:true
           }]
    },
    {
        path:'/news',
        component:Layout,
        name:'news',
        redirect:'/news/news-trends',
        children:[
            {
            path:'news-trends',
            name:'news-trends',
            component:()=>import('@/views/news/news-trends'),
            meta:{title:'新闻动态'},
           },
           {
            path:'news-show',
            name:'news-show',
            component:()=>import('@/views/news/news-show'),
            meta:{title:'新闻详情'},
            hidden:true
           }
       ]
    },
    {
        path:'/notice',
        component:Layout,
        name:'notice',
        redirect:'/notice/notice-trends',
        meta:{title:'通知公告'},
        children:[{
            path:'notice-trends',
            name:'notice-trends',
            component:()=>import('@/views/notice/notice-trends'),
            meta:{title:'通知公告'}
           },
           {
               path:'notice-show/:noticeid',
               name:'notice-show',
               component:()=>import('@/views/notice/notice-show'),
               meta:{title:'公告详情'},
               hidden:true
           }
       ]
    },
    {
        path:'/quality',
        component:Layout,
        redirect:'/quality/quality-list',
        name:'quality',
        children:[
            {
            path:'quality-list',
            name:'quality-list',
            component:()=>import('@/views/quality/quality-list'),
            meta:{title:'质量信息'}
            },
            {
            path:'quality-details',
            name:'quality-details',
            component:()=>import('@/views/quality/quality-details'),
            hidden:true,
            }
        ]
    },
    {
        path:'/honor',
        component:Layout,
        redirect:'/honor/honor-list',
        name:'honor',
        meta:{title:'荣誉中亚'},
        children:[
            {
            path:'honor-list',
            name:'honor-list',
            component:()=>import('@/views/honor/honor-list'),
            meta:{title:'荣誉中亚'}
            },
            {
                path:'honor-details',
                name:'honor-details',
                component:()=>import('@/views/honor/honor-details'),
                meta:{title:'员工信息'},
                hidden:true,
            }
        ]
    },
    {
        path:'/train',
        component:Layout,
        redirect:'/train/index',
        name:'train',
        children:[
            {
            path:'train-list',
            name:'train-list',
            component:()=>import('@/views/train/index'),
            meta:{title:'培训专栏'}
            },
            {
                path:'train-details',
                name:'train-details',
                component:()=>import('@/views/train/details'),
                meta:{title:'文档详情'},
                hidden:true,
            }
        ]
    },
    {
        path:'/institution',
        component:Layout,
        redirect:'/institution/index',
        children:[
            {
            path:'index',
            name:'institution',
            component:()=>import('@/views/institution/index'),
            meta:{title:'制度文档'}
            },
            {
                path:'institution-details',
                name:'institution-details',
                component:()=>import('@/views/institution/details'),
                meta:{title:'文档详情'},
                hidden:true,
            }
        ]
    },
    /* {
        path:'/project',
        component:Layout,
        redirect:'/project/index',
        name:'project',
        children:[
            {
            path:'project-list',
            name:'project-list',
            component:()=>import('@/views/project/index'),
            meta:{title:'项目进度'}
            }
        ]
    }, */
    {
        path:'/knowledge-sharing',
        component:Layout,
        redirect:'/knowledge-sharing/index',
        name:'knowledge',
        meta:{title:'工作交流'},
        children:[
            {
            path:'index',
            name:'knowledge-sharing',
            component:()=>import('@/views/knowledge-sharing/index'),
            meta:{title:'知识共享'}
            },
            {
                path:'details/:articleid',
                name:'knowledge-details',
                component:()=>import('@/views/knowledge-sharing/details'),
                meta:{title:'知识详情'},
                hidden:true
            },
            {
                path:'release/:id/:isupdate',
                name:'release',
                component:()=>import('@/views/knowledge-sharing/release'),
                meta:{title:'发布经验'},
                hidden:true
            }
        ]
    },
    {
        path:'/search',
        component:Layout,
        redirect:'/search/search-list',
        name:'search',
        hidden:true,
        children:[
            {
                path:'search-list',
                name:'search-list',
                component:()=>import('@/views/search/search-list'),
                
            }
        ]
    }
]
export const asyncRoutes = []

const createRouter = () => new Router({
    mode:'history',
    base:"/portalSiteTourist/",
    scrollBehavior:() =>({y:0}),
    routes:constantRouter
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
  
export default router