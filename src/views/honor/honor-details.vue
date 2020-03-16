<template>
    <div  style="margin:80px 20%">
        <div >
                <breadcrumd  ></breadcrumd>
        </div>
        <div style="margin-top: 100px;" v-if="isLoading">
            <el-row type="flex" :gutter="20" >
                <el-col :span="6" style="height: 200px;padding-top: 20px;">
                    <div class="honourImage"  >
                        <img style="width: 100%;height: 100%;" :src="scrUrl" alt="">
                        
                    </div>
                    <div style="text-align: center;">
                        <h3>姓名:{{detailInfo.pepole}}</h3>
                        <h3>
                               荣誉:{{detailInfo.title}}
                       </h3>
                    </div>
                    
                </el-col>
                <el-col :span="16" :offset="2">
                    <div class="honourPepole">
                        <h4>荣誉简介:</h4>
                        <span  style="text-indent: 2em;">{{detailInfo.honortitle}}</span>
                        <h4>详细介绍:</h4>
                        <span v-html="detailInfo.content" style="text-indent: 2em;" ></span>
                    
                    </div>
                </el-col>
              </el-row>
             
        </div>
        <div v-else style="min-height: 500px;position: relative;" >
            <loading></loading>
        </div>
    
        
    </div>
            
    
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import Loading from "@/components/loading"
import { getHonourDetail } from "@/api/honor"
export default {
    data(){
        return {
            detailInfo:{},
            isLoading:false,
            isNoData:false,
            
        }
    },
    methods: {
        handleGetHonourDetail(){
            const data = {
                articleid:this.detailId
            }

            getHonourDetail(data).then(response => {
                this.isLoading = true
                this.detailInfo = response
                
            })
        }
    },
     computed:{
        detailId(){
            return this.$route.params.articleid
        },
        scrUrl(){
            return `${process.env.VUE_APP_BASE_API}/${this.detailInfo.imageUrl}`
        }
     },
     components:{
        Breadcrumd,
        Loading
     },
     mounted(){
         this.handleGetHonourDetail()
        let routes = [
            {
              name:"荣耀列表",
              path:'/honor/honor-list'
            },
            {
              name:"个人信息",
              path:'/honor/honor-details'
              }
            ]
           this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
     }
    
}
</script>
<style scoped>
.honourImage {
    height:100%;
    border-radius: 50%;
    overflow: hidden;
}

</style>

