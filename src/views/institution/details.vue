<template>
    <div style="margin:100px 18% 20px 18%;" >
            <div >
                    <breadcrumd  ></breadcrumd>
            </div>
            <detail v-show="loading" detailName="articleid" @emitIsLoading="getLoading" :getDetail="getRegulationsDetail" :detailId="detailId"></detail>
            <div v-if="!loading" style="position: relative;min-height: 400px;" >
                <loading></loading>
            </div>

    </div>
    
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import Detail from "@/components/detail"
import Loading from "@/components/loading"
import { getRegulationsDetail } from "@/api/institution"  
export default {
    data(){
        return{
            loading:false,
        }
    },
    computed:{
        detailId(){
            return this.$route.params.articleid
        }
    },
    methods: {
        getRegulationsDetail,
        getLoading(val){
            this.loading = true
        }
    },
    mounted(){
        let routes = [
            {
              name:"制度文档",
              path:'/institution'
            },
            {
              name:"文档详情",
              path:'/institution/details'
              }
            ]
           this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
    },
    components:{
        Breadcrumd,
        Detail,
        Loading
    }
}
</script>
