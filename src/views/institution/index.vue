<template>
        <div class="institution" >
             <sidebar-menu class="animated fadeInLeftBig" ></sidebar-menu>      
            <div style="margin: 100px 18% 40px 18%;position: relative;" >
                    <news-title titlea="制度" titleb="文档" english="System Document" :ismany="false" ></news-title>

                    <el-input v-model="searchVlaue" placeholder="请输入文档名称"  class="institution-search" >
                                <template slot="append">
                                    <i class="el-icon-search" style="color: #fff" ></i>
                                </template>
                    </el-input>
                    <el-row :gutter="20" justify="space-between" >
                            <el-col :span="24" style="height: 40px;line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                    <items :row="item" ></items>
                            </el-col>
                    </el-row>
                  
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
    import Item from './Item'
    import NewsTitle from '../news/news-title'
    import SidebarMenu from './sidebar-menu'
    import Items from './Items'
    export default {
        components:{
            Item,
            NewsTitle,
            SidebarMenu,
            Items,
           
        },
        data(){
            return {
                pageSize:10,
                current:1,
                total:120,
                pageSizes:[8,16,32],
                searchVlaue:null,
                documentList:[
                        {
                                title:'如何高效的学习.doc',
                                date:'2019/12/15',
                                description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
                        },
                        {
                                title:'如何高效的学习.doc',
                                date:'2019/12/15',
                                description:'这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点,这个是讲述如何高效的学习,高效的利用时间来达到短时间内的高效输出和学习新的知识点'
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
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
    
            },
           //current 变化回调
            handleCurrentChange(val){
    
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
            right: 2%;
    }
    .institution {
         position: relative;
         min-width: 1200px;
         height: 75vh;
    }
    </style>