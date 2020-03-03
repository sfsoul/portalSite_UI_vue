<!--
 * @Author: your name
 * @Date: 2020-03-02 17:41:06
 * @LastEditTime: 2020-03-02 17:41:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\knowledge-sharing\release\index.vue
 -->
<template>
    <div style="margin:100px 18% 20px 18%;" >
        <div >
                <breadcrumd  ></breadcrumd>
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
        mounted () {
            let routes = [
                {
                  name:"知识共享",
                  path:'/knowledge-sharing'
                },
                {
                  name:"分享经验",
                  path:'/knowledge-sharing/details'
                  }
                ]
            this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        },
        components:{
            Breadcrumd
        }
    }
</script>