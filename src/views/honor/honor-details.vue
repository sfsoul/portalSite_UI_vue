<template>
    <div>
        <div style="margin:80px 20%" >
                <breadcrumd  ></breadcrumd>
        </div>
           
        <div class="honor-details" v-if="userInfo" >
               
                <div class="honor-details-name" >
                    <h1>{{userInfo.name}}</h1>
                </div>
                <div class="honor-name" >
                    <h4>荣誉:{{userInfo.honor}}</h4>
                </div>
                <div class="honor-image" >
                    <img  src="../../assets/images/beijing.png" alt="">
                </div>
                <div class="honor-content" >
                    <span>{{userInfo.content}}</span>
                </div>
        </div>
    </div>
            
    
</template>

<script>
 import Breadcrumd from '@/components/breadcrumd.vue'  
export default {
    data(){
        return {
        }
    },
     computed:{
        userInfo(){
            return this.$route.params.info
        }
     },
     components:{
        Breadcrumd
     },
     mounted(){
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

