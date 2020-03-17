<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-17 13:09:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\home\Home.vue
 -->

<template>
    <div>
        <carousel></carousel>
        <div style="margin:10px 18% " >
                <news></news>
                <el-row type="flex" :gutter="60" justify="space-btween" style="margin-top: 40px" >
                        <el-col ref="notice"  :span="12" style="height: 400px;" :class="noticeClass" >
                            <notice></notice>
                        </el-col>
                        <el-col ref="quality"  :span="12" style="height: 400px;" :class="qualityClass" >
                                <quality></quality>
                        </el-col>
                </el-row>
                <module-entrance ref="entrance" :class="entranceClass" ></module-entrance>
                <honor :class="honorClass" style="margin-bottom: 100px;"></honor>
        </div>
        
    </div>
</template>

<script>
import { Carousel,ModuleEntrance } from '../home'
import News from '@/views/news/index'
import {Notice} from '@/views/notice/index'
import {Quality} from '@/views/quality/index'
import { Honor } from '@/views/honor/index'
import { throttle } from '@/utils/commonality.js'
export default {
    data(){
        return {
            noticeClass:["animated","bounceInLeft"],
            qualityClass:["animated","bounceInRight"],
            entranceClass:["animated","rotateInDownLeft"],
            honorClass: ["animated","fadeInLeftBig"]
        }
    },
    components:{
        Carousel,
        News,
        Notice,
        Quality,
        ModuleEntrance,
        Honor
    },
    mounted(){
      window.addEventListener('scroll',throttle(this.handleScroll,300))
    },
    computed: {
       
    },
    methods: {
        handleScroll(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            this.$store.dispatch('animated/getScrollTop',scrollTop)
            this.handleShow(scrollTop,200,300)
            this.handleEntrance(scrollTop,500,700)
            this.handleHonor(scrollTop,800,1100)
        },
        handleShow(scrollTop,minTop,maxTop){
            if(scrollTop >= maxTop){
                this.noticeClass=["animated","fadeInUp"]
                this.qualityClass=["animated","fadeInUp"]
            }else if(scrollTop <= minTop){
                this.noticeClass=["animated","fadeOutDown"]
                this.qualityClass=["animated","fadeOutDown"]
            }
        },
        handleEntrance(scrollTop,minTop,maxTop){
            if(scrollTop >= maxTop){

                this.entranceClass=["animated","fadeInUp"]
                
            }else if(scrollTop <= minTop){

                this.entranceClass=["animated","fadeOutDown"]
            }
        },
        handleHonor(scrollTop,minTop,maxTop){
            if(scrollTop >= maxTop){

                this.honorClass=["animated","fadeInUp"]

            }else if(scrollTop <= minTop){

                this.honorClass=["animated","fadeOutLeftBig"]
            }
        }
    }
}
</script>
<style scoped>
    
</style>