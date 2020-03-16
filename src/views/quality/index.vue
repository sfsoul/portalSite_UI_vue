<template>
    <div style="width: 100%;" >
        <quality-title :title="title" english="Quality Information" :isSearch="false" routeSkip="quality-list"  ></quality-title>
        <quality-item v-if="isLoading" :qualityData="qualityData"  ></quality-item>
        <div v-else style="min-height: 250px;position: relative;" >
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isLoading" style="min-height: 250px;position: relative;">
            <no-data></no-data>
       </div>
    </div>
</template>

<script>
import { QualityItem } from '../quality'
import QualityTitle from '@/components/title'
import { getQualitys } from '@/api/quality'
import Long from 'long'
import Loading from "@/components/loading"
import NoData from '@/components/noData'

export default {
    components:{
        QualityItem,
        QualityTitle,
        Loading,
        NoData

    },
    methods: {
        //获取分页列表
        handleGetQualitys({current=this.current,pageSize=this.pageSize}={}){
            getQualitys({current,pageSize}).then(response => {
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
    mounted(){
        this.handleGetQualitys();
        
    },
    data(){
        return {
            title:{
                nameLeft:"质量",
                nameRight:"信息"
            },
            pageSize:10,
            current:1,
            total:0,
            qualityData:[],
            isLoading:false,
            isNoData:false,
        }
    }
}


</script>