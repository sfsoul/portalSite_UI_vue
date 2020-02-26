<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-02-26 22:16:26
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
                        <el-col ref="notice"  :span="12" style="max-height: 400px;" :class="noticeClass" >
                            <notice></notice>
                        </el-col>
                        <el-col ref="quality"  :span="12" style="max-height: 400px;" :class="qualityClass" >
                                <quality></quality>
                        </el-col>
                </el-row>
                <module-entrance ref="entrance" :class="entranceClass" ></module-entrance>
                <honor></honor>
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
            entranceClass:["animated","rotateInDownLeft"]
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
            this.handleShow(scrollTop,300,400)
            this.handleentrance(scrollTop,400,600)
        },
        handleShow(scrollTop,minTop,maxTop){
            if(scrollTop >= maxTop){
                this.noticeClass=["animated","bounceInLeft"]
                this.qualityClass=["animated","bounceInRight"]
            }else if(scrollTop <= minTop){
                this.noticeClass=["animated","bounceOutLeft"]
                this.qualityClass=["animated","bounceOutRight"]
            }
        },
        handleentrance(scrollTop,minTop,maxTop){
            if(scrollTop >= maxTop){

                this.entranceClass=["animated","rotateInDownLeft"]
                
            }else if(scrollTop <= minTop){

                this.entranceClass=["animated","rotateOutDownLeft"]
            }
        }
    }
}
</script>
<style>
</style>