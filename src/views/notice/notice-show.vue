<template>
        <div style="margin: 100px 18%" >
            <breadcrumd></breadcrumd>
            
            <detail v-show="isLoading"  detailName="noticeid" @emitIsLoading="getLoading" :getDetail="getNoticeDetail" :detailId="detailId"></detail>
            <div v-if="!isLoading" style="min-height: 400px; position: relative;">
                <loading></loading>
            </div>
            
        </div>
    </template>
    
    <script>
 import Breadcrumd from '@/components/breadcrumd.vue'
 import { getNoticeDetail } from '@/api/notice'
 import Loading from '@/components/loading'
 import Detail from "@/components/detail"
 export default {
        data(){
            return {
                noticeDetail:null,
                isLoading:false,
            }    
        },
        props:{
            
        },
        components:{
            Breadcrumd,
            Loading,
            Detail
        },
        methods:{
            //获取通知详情
            getNoticeDetail,
            getLoading(val){
                this.isLoading = val
            }
           
        },
        computed: {
            detailId(){
                return this.$route.params.noticeid
            },
        },
        mounted(){

            //面包屑
            let routes = [
            {
              name:"公告列表",
              path:'/notice/notice-trends'
            },
            {
              name:"公告详情",
              path:'/notice/notice-show'
              }
            ]
           this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        }
    }
    </script>
    
    <style>
    
    </style>