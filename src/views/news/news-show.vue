<template>
    <div style="margin: 100px 18%" v-if="this.newInfo" >
        <breadcrumd></breadcrumd>
        <el-divider content-position="right">{{newInfo.newsTName}}</el-divider>
        <div style="background: #fff;line-height: 40px;" >
            <div>
                <h2 style="text-align: center" >{{newInfo.titile}}</h2>
            </div>
            <div style="text-align: center;" >
                <span>{{newInfo.publishdate}}</span>
                <span style="margin-left: 20px">发布人:{{newInfo.author}}</span>
                <span style="margin-left: 20px" >浏览量:1250</span>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getNewsDetail } from '@/api/news'
export default {
    data(){
        return {
            newInfo:null,//新闻详情
        }
    },
    props:{
        
    },
    components:{
        Breadcrumd
    },
    computed: {
    },
    methods: {
       handleGetNewsDetail(newsid){
          getNewsDetail(newsid).then(response => {
                  console.log(response)
                  this.newInfo = response
          })
       }  
    },
    mounted(){
       let newsid = BigInt(this.$route.query.newsid) 
       //获取新闻详情
       this.handleGetNewsDetail(newsid)
        let routes = [
            {
              name:"新闻动态",
              path:'/news/news-trends'
            },
            {
              name:"新闻详情",
              path:'/news/news-show'
            }
          ]
        this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
    }
}
</script>

<style>

</style>