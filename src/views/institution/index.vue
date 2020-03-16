<template>
        <div class="institution" >
             <sidebar-menu class="animated fadeInLeftBig" ></sidebar-menu>      
            <div style="margin: 100px 18% 40px 18%;position: relative;" >
                 <!--头部标题-->
                    <institution-title :title="title" english="System Document" :ismany="false"  ></institution-title>


                    <div v-if="isLoading"  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                         <items :row="item" :index="index" ></items>
                    </div>
                    <div v-else style="min-height: 500px;position: relative;" >
                       <loading></loading>
                    </div>
                    <div v-if="!isNoData&&isLoading" style="min-height: 500px;position: relative;">
                     <no-data></no-data>
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
import InstitutionTitle from '@/components/title'
import SidebarMenu from './sidebar-menu'
import Items from './Items'
import { getRegulations } from "@/api/institution"
import Long from "long"
import Loading from "@/components/loading"
import NoData from '@/components/noData'
    export default {
        components:{
            InstitutionTitle,
            SidebarMenu,
            Items,
            Loading,
            NoData
           
        },
        data(){
            return {
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30],
                title:{
                   nameLeft:'制度',
                   nameRight:'文档'
                },
                documentList:[],
                isLoading:false,
                isNoData:false,

            }
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
                this.pageSize = val 
                this.handleGetRegulations()
            },
           //current 变化回调
            handleCurrentChange(val){
                this.current = val
                this.handleGetRegulations()
            },
            //分页获取制度文档详情
            handleGetRegulations({current=this.current,pageSize=this.pageSize}={}){
                getRegulations({current,pageSize}).then(response => {
                this.isLoading = true
                let page = response.page
                this.total = page.total
                if(response && response.value.length>0){
                    this.isNoData = true
                    this.documentList = response.value.map(item =>{
                        item.id = (Long.fromValue(item.id)).toString()
                        return item
                    })
                }
            }) 
            }
        },
        mounted () {
                this.handleGetRegulations()
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
    .institution {
         position: relative;
         min-width: 1200px;
         height: 75vh;
    }
    </style>