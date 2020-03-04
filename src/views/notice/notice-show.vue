<template>
        <div style="margin: 100px 18%" >
            <breadcrumd></breadcrumd>
            <div v-if="isNotice" style="height: 100px;background: #fff;line-height: 40px;min-width: 1000px;" >
                <div>
                    <h2 style="text-align: center" >{{noticeDetail.title}}</h2>
                </div>
                <div style="text-align: center;" >
                    <span>{{noticeDetail.reviewdate}}</span>
                    <span style="margin-left: 20px" >发布人:{{noticeDetail.author}}</span>
                    <span style="margin-left: 20px" >浏览量:1250</span>
                </div>
                <div style="width: 100%;background: #fff;border-top: 1px solid #666;" >
                    <span v-html="noticeDetail.contentStr" ></span>
                </div>
            </div>
            <div v-else style="min-height: 400px; position: relative;">
                <loading></loading>
            </div>
            
        </div>
    </template>
    
    <script>
 import Breadcrumd from '@/components/breadcrumd.vue'
 import { getNoticeDetail } from '@/api/notice'
 import Loading from '@/components/loading'
 export default {
        data(){
            return {
                noticeDetail:null,
                isNotice:false,
            }    
        },
        props:{
            
        },
        components:{
            Breadcrumd,
            Loading
        },
        methods:{
            //获取通知详情
            handleGetNoticeDetail(noticeid){
                getNoticeDetail(noticeid).then(response=>{
                    this.isNotice = true
                    this.noticeDetail = response
                })
            }
        },
        mounted(){

            //获取通知详情
            let noticeid = this.$route.params.noticeid || null
            this.handleGetNoticeDetail(noticeid)

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