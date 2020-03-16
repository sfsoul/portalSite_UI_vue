<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-03 17:10:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\honor\index.vue
 -->
<template>
    <div>
        <honor-title :title="title" english="Company Honors" :isSearch="false" routeSkip="honor-list"  ></honor-title>
        <honor-item v-if="isLoading" :honour-data-list="honourDataList"></honor-item>
        <div v-else style="min-height: 500px;position: relative;" >
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isLoading" style="min-height: 400px;position: relative;">
            <no-data></no-data>
        </div>
    </div>
</template>
<script>
import {HonorItem } from './index'
import HonorTitle from '@/components/title'
import { getHonours } from "@/api/honor"
import Long from "long"
import Loading from "@/components/loading"
import NoData from "@/components/noData"
export default {
    components:{
        HonorTitle,
        HonorItem,
        NoData,
        Loading
    },
    data(){
        return{
            title:{
                nameLeft:"荣誉",
                nameRight:"中亚"
            },
            isLoading:false,
            isNoData:false,
            honourDataList:[]
        }
    },
    methods: {
        handleGetHonour({current,pageSize}){
            getHonours({current,pageSize}).then(response => {
                this.isLoading = true
                if(response.value && response.value.length >0){
                    this.isNoData = true
                    this.honourDataList = response.value.map(item=>{
                        item.id = (Long.fromValue(item.id)).toString()
                        return item
                    })
                }
            })
        }
    },
    mounted () {
        this.handleGetHonour({current:1,pageSize:8})
    }

}
</script>