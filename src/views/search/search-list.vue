<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-03 17:58:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\search\search-list.vue
 -->
<template>
    <div  class="search" >
        <search-menu :information-category="informationCategory" ></search-menu>
        <div class="search-content">
            <search-title :title="title" english="Search Result" :ismany="false" ></search-title>
            <item v-for="(item,index) in infoDataList" :searchInfo="item" :key="index" ></item> 

           <el-pagination
                   background 
                  :page-size="pageSize"
                  :total="total"
                  :current-page="current"
                  layout="total,sizes,prev,pager,next,jumper"
                  :page-sizes="pageSizes"
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
                </el-pagination>
        </div>
    </div>
</template>

<script>
import SearchMenu from './search-menu'
import Item from './Item'
import SearchTitle from '@/components/title'
import {searchArticles} from "@/api/home"
export default {
    data(){
        return {
            pageSize:10,
            current:1,
            total:0,
            pageSizes:[8,16,32],
            title:{
                nameLeft:"搜索",
                nameRight:"结果"
            },
            informationCategory:null,//信息类别统计
            infoDataList:[],
            fastsearch:null,

        }
    },
    components:{
        SearchMenu,
        Item,
        SearchTitle
    },
    methods:{
        // pagesize 变化回调
        handleSizeChange(val){

        },
       //current 变化回调
        handleCurrentChange(val){

        },
        handleSearchArticles({current=this.current,pageSize=this.pageSize,articletype=-1,fastsearch=this.fastsearch}={}){
           
            const data = {
                current,
                pageSize,
                articletype,
                fastsearch
            }
            searchArticles(data).then(response => {
                this.total = response.articles.page.total
                this.informationCategory = response.categorys
                this.infoDataList = response.articles.value

            })
        }
    },

    watch: {
        fastsearch(){
            this.handleSearchArticles()
        }
    },
    mounted () {
      
       this.fastsearch = this.$route.query.fastsearch
    },
    beforeDestroy () {
      
    },
}
</script>

<style scoped lang="scss">

.search {
    position: relative;
    min-width: 1200px;

    .search-content {
        margin: 100px 18% 20px 18%;
        position: relative;
    }
}

</style>