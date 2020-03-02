<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-02-29 19:09:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\news\index.vue
 -->
<template>
    <div style="margin-top: 40px" >  
        <news-title titlea="新闻" titleb="动态" english="New Information"  ></news-title>
        <el-row :gutter="20" type="flex" justify="space-btween" v-if="isNew" >
            <el-col :span="12"  style="max-height: 400px;min-height: 398px;" class="animated rollIn" >
                   <news-details :activeInfo="activeInfo" ></news-details>
            </el-col>
            <el-col :span="12" style="max-height: 400px;" class="animated slideInRight" >
                    <news-item @imageToDetails="receptiomImageInfo" :newsData="newsData" ></news-item>
            </el-col>
        </el-row>
        <div v-else style="min-height: 400px;position: relative;">
            <loading></loading>
        </div>
    </div>
</template>
<script>
import NewsItem from './news-Item'
import NewsDetails from './news-details'
import NewsTitle from './news-title'
import { getNewList } from '@/api/news'
import Loading from '@/components/loading'
export default {
    data(){
        return {
            activeInfo:null,
            newsData:[],//新闻列表数据
            isNew:false,//是否有新闻
        }
    },
    components:{
        NewsItem,
        NewsDetails,
        NewsTitle,
        Loading
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
                    if(response.value && response.value.length > 0){
                        this.isNew = true
                        this.newsData = response.value.slice(0,6);
                        this.newsData.map(item=>{
                            item.id = BigInt(item.id)
                        })
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