<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-03 17:10:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\honor\index.vue
 -->
<template>
    <div>
        <honor-title :title="title" english="Company Honors" :isSearch="true" routeSkip="honor-list"  ></honor-title>
        <honor-item></honor-item>
    </div>
</template>
<script>
import {HonorItem } from './index'
import HonorTitle from '@/components/title'
export default {
    components:{
        HonorTitle,
        HonorItem
    },
    data(){
        return{
            title:{
                nameLeft:"荣誉",
                nameRight:"中亚"
            }
        }
    }
}
</script>