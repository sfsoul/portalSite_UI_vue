<template>
        <div style="margin: 100px 18% 40px 18%;position: relative;" >
                 <!--头部标题-->
                    <knowledag-title :title="title" english="Training Center" :ismany="false"  ></knowledag-title>   

                 <div style="background: #fff;padding: 20px;" >
                        <el-button class="my-knowledge" type="primary" @click="handleMyKnowledge">我的文章<i class="el-icon-video-play"></i></el-button>
                        <el-button class="gorelease-button" type="primary" @click="goRelease">分享我的经验<i class="el-icon-video-play"></i></el-button>
                                <div  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                        <items :row="item" ></items>
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
    import {getCurrentUserShares,getKnlgeShares } from "@/api/knowledge-sharing"
    export default {
        components:{
        /*     Item, */
            KnowledagTitle,
            Items
        },
        data(){
            return {
                pageSize:10,
                current:1,
                total:120,
                pageSizes:[8,16,32],
                title:{
                        nameLeft:"知识",
                        nameRight:'共享'
                },
                documentList:[
                            {
                                    title:'如何高效的学习.doc',
                                    date:'2019/12/15',
                                    description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                            },
                            {
                                    title:'如何高效的学习.doc',
                                    date:'2019/12/15',
                                    description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                            },
                            {
                                    title:'如何高效的学习.doc',
                                    date:'2019/12/15',
                                    description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                            },
                            {
                                    title:'如何高效的学习.doc',
                                    date:'2019/12/15',
                                    description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                            },{
                                    title:'如何高效的学习.doc',
                                    date:'2019/12/15',
                                    description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                            }
                    ]
            }
        },
        computed: {
                ...mapGetters([
                        "token"
                ])
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
                    if(this.token && this.token!==undefined){
                        this.$router.push({name:'release'})
                    }else{
                            this.$message({
                                    message:"请先登录后操作",
                                    type:'warning'
                            })
                    }
                   
            },
            //我的文章
            handleMyKnowledge(){

            }
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
                right: 25%;
    }
    .my-knowledge {
        position: absolute;
        top: 0%;
        right: 35%;
    }
    </style>