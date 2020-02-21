<template>
    <div>
        <carousel></carousel>
        <div style="margin:10px 18% " >
                <news></news>
                <el-row type="flex" :gutter="60" justify="space-btween" style="margin-top: 40px" >
                        <el-col :span="12" style="max-height: 400px;" >
                            <notice></notice>
                        </el-col>
                        <el-col :span="12" style="max-height: 400px;" >
                                <quality></quality>
                        </el-col>
                </el-row>
                <module-entrance></module-entrance>
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
export default {
    components:{
        Carousel,
        News,
        Notice,
        Quality,
        ModuleEntrance,
        Honor
    },
    mounted(){
        async function* genter(){

            yield 132; // B
        }

        let gen = genter()
        console.log(gen.next().then(value =>{console.log(value)}))
    }
}
</script>
<style>
</style>