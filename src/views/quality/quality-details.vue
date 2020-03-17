<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 10:43:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\quality\quality-details.vue
 -->
<template>
    <div style="margin: 100px 18%" >
        <breadcrumd></breadcrumd>
        <detail v-show="loading" detailName="articleid" @emitIsLoading="getLoading" :getDetail="getQualityDetail" :detailId="detailId"></detail>
        <div v-if="!loading" style="min-height: 250px;position: relative;" >
            <loading></loading>
        </div>
    </div>
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getQualityDetail } from "@/api/quality"
import Detail from "@/components/detail"
import Loading from "@/components/loading"
export default {
    props:{
        
    },
    components:{
        Breadcrumd,
        Detail,
        Loading
    },
    methods: {
        getQualityDetail,
        getLoading(val){
            console.log(val)
            this.loading = val
        }
    },
    data(){
        return {
            loading:false,
        }
    },
    computed: {
        detailId(){
            return this.$route.params.articleid
        }
    },
    mounted(){
        let routes = [
            {
              name:"质量信息",
              path:'/quality/quality-list'
            },
            {
              name:"质量详情",
              path:'/quality/quality-details'
            }
          ]
        this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
    }
}
</script>

<style>

</style>