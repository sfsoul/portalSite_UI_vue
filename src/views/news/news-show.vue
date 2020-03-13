<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-02 11:45:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\news\news-show.vue
 -->
<template>
    <div style="margin: 100px 18%">
        <breadcrumd></breadcrumd>
        <div v-if="newInfo">
            <el-divider content-position="right">{{newInfo.newsTName}}</el-divider>
            <div style="background: #fff;line-height: 40px;" >
                <div>
                    <h2 style="text-align: center" >{{newInfo.title}}</h2>
                </div>
                <div style="text-align: center;" >
                    <span>{{newInfo.publishdate}}</span>
                    <span style="margin-left: 20px">发布人:{{newInfo.author}}</span>
                    <span style="margin-left: 20px" >浏览量:{{newInfo.pageview}}</span>
                </div>
            </div>
            <div style="width: 100%;height: 100%;background: #fff;overflow: hidden;border-top: 1px solid #666;" >
                <span v-html="newInfo.content" ></span>
            </div>
        </div>
        <div v-else style="min-height: 400px; position: relative;">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getNewsDetail } from '@/api/news'
import Loading from '@/components/loading'
export default {
    data(){
        return {
            newInfo:null,//新闻详情
        }
    },
    props:{
        
    },
    components:{
        Breadcrumd,
        Loading
    },
    computed: {
    },
    methods: {
       handleGetNewsDetail(newsid){
          getNewsDetail(newsid).then(response => {
                  this.newInfo = response
                  console.log(this.newInfo)
          })
       }  
    },
    mounted(){
       let newsid = BigInt(this.$route.query.newsid) 
       //获取新闻详情
       this.handleGetNewsDetail(newsid)
        let routes = [
            {
              name:"新闻动态",
              path:'/news/news-trends'
            },
            {
              name:"新闻详情",
              path:'/news/news-show'
            }
          ]
        this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
    }
}
</script>

<style>

</style>