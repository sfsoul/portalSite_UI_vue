<!--
 * @Author: your name
 * @Date: 2020-03-02 22:37:23
 * @LastEditTime: 2020-03-03 16:07:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\title\index.vue
 -->
<template>
    <div class="modules-titles animated fadeInDown" >
            <span>{{title.nameLeft}}<span>{{title.nameRight}}</span></span>
            <div class="modules-division" ></div>
            <div>{{english}}</div>
            <div class="modules-even" v-if="ismany" >
                <router-link :to="{name:routeSkip}">
                        <span style="color:#8f9494;" >更多>></span>
                </router-link>
            </div>
            <el-input v-model="searchVlaue" v-if="isSearch" placeholder="请输入名称"  class="institution-search" >
                <template slot="append">
                    <i class="el-icon-search" style="color: #fff" @click="callback(searchVlaue)" ></i>
                </template>
            </el-input>
   </div>
</template>

<script>
export default {
    data(){
        return{
            searchVlaue:null,
        }
    },
props:{
    title:{
        type:Object,
        default:{
            nameLeft:'新闻',
            nameRight:'动态'
        }
    },
    english:{
        type:String,
        default:''
    },
    ismany:{
        type:Boolean,
        default:true
    },
    routeSkip:{
        type:String,
        default:''
    },
    callback:{
        type:Function
    },
    isSearch:{
        type:Boolean,
        default:true,
    }
}
}
</script>

