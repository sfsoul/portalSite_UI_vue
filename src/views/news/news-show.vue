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

        <detail v-show="isLoading"  detailName="newsid" @emitIsLoading="getLoading" :getDetail="getNewsDetail" :detailId="detailId"></detail>

        <div v-if="!isLoading" style="min-height: 400px; position: relative;">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getNewsDetail } from '@/api/news'
import Detail from "@/components/detail"
import Loading from '@/components/loading'
export default {
    data(){
        return {
            newInfo:null,//新闻详情
            isLoading:false,
        }
    },
    props:{
        
    },
    components:{
        Breadcrumd,
        Loading,
        Detail
    },
    computed: {
        detailId(){
                return this.$route.query.newsid
        },
    },
    methods: {
        getNewsDetail,
      
       getLoading(val){
            this.isLoading = val
        }  
    },
    mounted(){
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