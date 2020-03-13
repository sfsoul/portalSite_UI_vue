<template>
        <div style="margin: 100px 18% 40px 18%;position: relative;" >
                 <!--头部标题-->
                    <knowledag-title :title="title" english="Training Center" :ismany="false"  ></knowledag-title>   

                 <div style="background: #fff;padding: 20px;" >
                    <el-button class="all-knowledge" type="primary" @click="handleGetKnlgeShares">所有文章<i class="el-icon-video-play"></i></el-button>
                        <el-button class="my-knowledge" type="primary" @click="handleMyKnowledge">我的文章<i class="el-icon-video-play"></i></el-button>
                        <el-button class="gorelease-button" type="primary" @click="goRelease">分享我的经验<i class="el-icon-video-play"></i></el-button>
                                <div  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                        <items :row="item" :isMyKnow="isMyKnow" :getMyKnowledge="handleMyKnowledge"  ></items>
                                </div>
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
/*     import Item from './Item' */
    import Items from './Items'
    import KnowledagTitle from '@/components/title'
    import { mapGetters } from 'vuex'
    import Long from "long"
    import {getCurrentUserShares,getKnlgeShares,getGoodKnlgeShares } from "@/api/knowledge-sharing"
    import { isLogin } from "@/utils/validate"
    export default {
        components:{
        /*     Item, */
            KnowledagTitle,
            Items
        },
        data(){
            return {
                pageSize:50,
                current:1,
                total:0,
                pageSizes:[5,10,20,40],
                isMyKnow:false,
                title:{
                        nameLeft:"知识",
                        nameRight:'共享'
                },
                documentList:[],
                goodKnlgeShares:[]
            }
        },
        computed: {
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
    
            },
           //current 变化回调
            handleCurrentChange(val){
    
            },
            //去发布界面 
            goRelease(){
                    if(isLogin()){
                        this.$router.push({name:'release'})
                    }else{
                            this.$message({
                                    message:"请先登录后操作",
                                    type:'warning'
                            })
                    }
                   
            },
            //获取精华帖
            handleGetGoodKnlgeShares({current=this.current,pageSize=this.pageSize}={}){
                getGoodKnlgeShares({current,pageSize}).then(response=>{
                    console.log()
                    this.goodKnlgeShares = response.value.map(item => {
                              item.id = (Long.fromValue(item.id)).toString()
                              return item 
                            })
                          
                })
            },
            //分页获取所有的文章列表
           async handleGetKnlgeShares({current=this.current,pageSize=this.pageSize}={}){
               await this.handleGetGoodKnlgeShares()
                getKnlgeShares({current,pageSize}).then(response=>{
                        this.isMyKnow = false;//游客
                        let page = response.page    
                        this.total  = page.total + (this.goodKnlgeShares.length)
                        this.documentList = response.value.map(item => {
                              item.id = (Long.fromValue(item.id)).toString()
                              return item 
                            })
                            console.log(this.goodKnlgeShares)
                        this.documentList=[...this.goodKnlgeShares,...this.documentList]
                
                })
            },
            //我的文章
            handleMyKnowledge({current=this.current,pageSize=this.pageSize}={}){
                    if(isLogin()){
                        getCurrentUserShares({current,pageSize}).then(response => {
                                this.isMyKnow = true //用户
                                let page = response.page
                                this.total  = page.total
                                this.documentList = response.value.map(item => {
                                    item.id = (Long.fromValue(item.id)).toString()
                                    return item
                                })
                        })
                    }else {
                            this.$message({
                                    message:"请先登录后操作",
                                    type:"warning"
                            })
                    }
            },
         
        },
        async mounted () {
            await this.handleGetGoodKnlgeShares()
              this.handleGetKnlgeShares()
        }
    }
    </script>
    <style lang="scss" scoped >
    .train-col-content {
        text-align: left;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 1px 1px 10px 1px #4c9ace;
        padding: 6px 16px 6px 16px;
        cursor: pointer;
        font-size: 16px;
        transition: all .3s;
        margin: 12px 12px;
    }
    .train-col-content:hover {
       transform: scale(1.1)
    }
    .institution-search {
                width: 20%;
                position: absolute;
                top: 1%;
                right: 0%;
    }
    .gorelease-button {
                position: absolute;
                top: 0%;
                right: 24%;
    }
    .my-knowledge {
        position: absolute;
        top: 0%;
        right: 36%;
    }
    .all-knowledge {
        position: absolute;
        top: 0%;
        right: 46%;
    }
    </style>