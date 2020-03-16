<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 10:50:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\quality\quality-list.vue
 -->
<template>
        <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
                <quality-title :title="title" english="Quality Information" :ismany="false" ></quality-title>
                <quality-item v-if="isLoading" :qualityData="qualityData"></quality-item>
                <div v-else style="min-height: 250px;position: relative;" >
                    <loading></loading>
                </div>
                <div v-if="!isNoData&&isLoading" style="min-height: 250px;position: relative;">
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
    </template>
    
    <script>
import {QualityItem} from '../quality'
import QualityTitle from '@/components/title'
import { getQualitys } from '@/api/quality'
import Long from 'long'
import Loading from "@/components/loading"
import NoData from '@/components/noData'

    export default {
        components:{
            QualityTitle,
            QualityItem,
            NoData,
            Loading
  
        },
        data(){
            return{
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30,40],
                title:{
                    nameLeft:"质量",
                    nameRight:"信息"
                },
                isNoData:false,
                isLoading:false,
                qualityData:[],
               
            }
        },
        methods:{
                // pagesize 变化回调
                handleSizeChange(val){
                    this.pageSize = val
                    this.handleGetQualitys()
                },
                //current 变化回调
                handleCurrentChange(val){
                    this.current = val
                    this.handleGetQualitys()
                },
                //分页获取质量列表
                handleGetQualitys({current=this.current,pageSize=this.pageSize}={}){
                     getQualitys({current,pageSize}).then(response => {
                          let page = response.page
                          this.total = page.total
                          this.isLoading = true
                         if(response.value.length > 0){
                             this.isNoData = true
                             this.qualityData = response.value.map(item => {
                             item.id = (Long.fromValue(item.id)).toString()
                             return item
                         })
                       }
                
                   })
               }
        },
        mounted () {
            this.handleGetQualitys()
        }
    }
    </script>