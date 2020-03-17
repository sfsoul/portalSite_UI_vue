<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-04 11:06:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\news\index.vue
 -->
<template>
    <div style="margin-top: 40px" >  
        <news-title :title="title" english="New Information" :isSearch="false" routeSkip="news-trends"  ></news-title>
        <el-row :gutter="20" type="flex" justify="space-btween" v-if="isNew" >
            <el-col :span="12"  style="height: 400px" class="animated rollIn" >
                    <news-details :activeInfo="activeInfo" ></news-details>
            </el-col>
            <el-col :span="12" style="max-height: 400px;" class="animated slideInRight" >
                    <news-item @imageToDetails="receptiomImageInfo" :newsData="newsData" ></news-item>
            </el-col>
        </el-row>
        <div v-if="!isNew" style="min-height: 400px;position: relative;">
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isNew" style="min-height: 400px;position: relative;">
              <no-data></no-data>
        </div>

    </div>
</template>
<script>
import NewsItem from './news-Item'
import NewsDetails from './news-details'
import NewsTitle from '@/components/title'
import { getNewList } from '@/api/news'
import Loading from '@/components/loading'
import NoData from '@/components/noData'
import Long from "long"
export default {
    data(){
        return {
            activeInfo:null,
            newsData:[],//新闻列表数据
            isNew:false,//是否有新闻
            title:{
                nameLeft:"新闻",
                nameRight:"动态"
            },
            isNoData:false,
        }
    },
    components:{
        NewsItem,
        NewsDetails,
        NewsTitle,
        Loading,
        NoData
    },
    props:{

    },
    methods:{
        //右侧展示新闻选中信息
        receptiomImageInfo(e){
            this.activeInfo = e.row
            
        },
        /**
        * 获取分页新闻列表
        */
        handleGetNewList(current,pageSize){
                getNewList(current,pageSize).then(response=>{
                       
                    if(response.value){
                        this.isNew = true
                        this.newsData = response.value.slice(0,6);
                        this.newsData.map(item=>{
                            item.id = (Long.fromValue(item.id)).toString()
                        })
                    }
                    if(response.value.length>0){
                        this.isNoData = true
                    }
                })
        }
    },
    mounted () {
        this.handleGetNewList(1,6)
    }
}
</script>
<style>

</style>