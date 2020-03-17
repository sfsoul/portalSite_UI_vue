<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-17 13:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\search\search-menu.vue
 -->
<template>
        <div>
            <dl class="list nigiri" style="transform: perspective(1200px);font-size: 14px;font-weight: 600;" >
                   <el-badge v-for="(item,index) in informationCategory" :max="99" :key="index" :value="item.count" class="item" >
                     <span>
                         <dd>{{item.articletypeStr}}</dd>
                    </span>
                  </el-badge>
            </dl>
        </div>
    </template>
    
    <script  >
    export default {
        data(){
            return {
            }
        },
        props:{
            informationCategory:{
                type:Array,
                default:[]
            }
        }
    }
    </script>
    
    <style scoped >
    
    .list {
        transform-style: preserve-3d;
        text-transform: uppercase;
        position: absolute;
        width: 300px;
        text-align: center;
        left: 0%;
    
    }
    .nigiri {
        transform: perspective(1200px) rotateY(40deg) !important;
        transform-origin: 110% 25%;
    }
    .list dt, .list  dd {
        text-indent: 10px;
        line-height: 35px;
        margin: 0;
        height: 35px;
        width: 200px;
        color: #fff;
        cursor: pointer;
       /*  border-bottom: 1px dashed #fff; */
        border:1px ridge #fdfdfc;
        transition: all 0.5s;
    }
    .list  dd:hover {
        margin-left: 30px;
        border-radius: 18px;
        background:#f0831e;
        margin-top: 6px;
        margin-bottom: 6px;
    }
    .list dt {
        transform: translateZ(0.3px);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
        font-size: 15px;
    }
    .nigiri dt, .nigiri  dd{
        background: #1886d1;
    }
    
    </style>