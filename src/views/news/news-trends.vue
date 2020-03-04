<template>
    <div >
        <el-carousel  height="500px" >
            <el-carousel-item v-for="item in 4" :key="item">
             
            </el-carousel-item>
        </el-carousel>
        <div style="margin: 18px 18%;background-color: #fff;padding: 20px;" >
            <news-title :title="title" english="New Information" :ismany="false" :callback="handleSearch" ></news-title>
            <div v-if="isloading">
                <item v-for="(news,index) in newsData" :row="news" :index="index" :key="index"   ></item>
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
            <div v-else style="min-height: 400px; position: relative;">
                <loading></loading>
            </div>
        </div>
        
    </div>
</template>
<script>
import Item from './Item'
import NewsTitle from '@/components/title'
import Breadcrumd from '@/components/breadcrumd.vue'
import { getNewList } from '@/api/news'
import Loading from '@/components/loading'
    export default {
        data(){
            return{
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30,40],
                newsData:[],//新闻列表数据
                isloading:false,//是否加载成功
                title:{
                    nameLeft:'新闻',
                    nameRight:'动态'
                }
            }
        },
        mounted(){
            this.handleGetNewList()
        },
        components:{
            NewsTitle,
            Item,
            Breadcrumd,
            Loading
        },
        props:{
                id: {default:1}
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
                this.pageSize = val
                this.handleGetNewList()
            },
            //current 变化回调
            handleCurrentChange(val){
                this.current = val
                this.handleGetNewList()
            },
            /**
             * 获取分页新闻列表
             */
            handleGetNewList({current=this.current,pageSize=this.pageSize}={}){
                getNewList(current,pageSize).then(response=>{
                    let page = response.page
                    console.log(response)
                    this.isloading = true
                    this.total = page.total
                    this.newsData = response.value
                    this.newsData.map(item=>{
                            item.id = BigInt(item.id)
                        })
                })
            },
            handleSearch(name){
                console.log(`这是名称`,name)
            }
        }
    }
</script>
<style>
    .el-carousel__item:nth-child(2n){
        background-image: url('../../assets/images/beijing.png')
        }
    .el-carousel__item:nth-child(2n+1){
            background-image: url('../../assets/images/banner.png')
        }
</style>