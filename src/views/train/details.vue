<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 10:51:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\train\details.vue
 -->
<template>
        <div style="margin:100px 18% 20px 18%;" >
                <div >
                        <breadcrumd  ></breadcrumd>
                </div>
                 <detail v-show="loading"  detailName="articleid"  @emitIsLoading="getLoading" :getDetail="getOrgTrainDetail" :detailId="detailId"></detail>
                 <div v-if="!loading" style="position: relative;min-height: 400px;" >
                     <loading></loading>
                 </div>
        </div>
        
    </template>
    
    <script>
import Breadcrumd from '@/components/breadcrumd.vue'
import Detail from "@/components/detail"
import Loading from "@/components/loading"
import { getOrgTrainDetail } from "@/api/train"    
    export default {
        data(){
            return {
                loading:false,
            }
        },
        methods: {
            getOrgTrainDetail,
            getLoading(val){
                this.loading = val
            }
        },
        computed:{
            detailId(){
                return this.$route.params.articleid
            },
        },
        mounted(){
            let routes = [
                {
                  name:"培训专栏",
                  path:'/train/train-list'
                },
                {
                  name:"文档详情",
                  path:'/train/details'
                  }
                ]
               this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        },
        components:{
            Breadcrumd,
            Loading,
            Detail
        }
    }
    </script>
    