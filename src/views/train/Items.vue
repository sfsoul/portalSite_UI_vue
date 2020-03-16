 <!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 09:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\quality\Item.vue
 -->
<template>
        <div style="display: flex;justify-content: space-between;flex-wrap: nowrap;font-size: 14px;margin: 20px 0px;color: #535151;" >
            <div style="width: 18px;height: 16px;background-color:#1886d1;color: #fff;text-align: center" >
                <span>{{index + 1}}</span>
            </div>
           
            <div style="width: 30%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center" >
                    <router-link :to="{name:'train-details',params:{articleid:row.id}}" style="text-decoration: none;color: #222;" >
                            <span>{{row.title}}</span>
                    </router-link>
                  
            </div>
            <div style="width: 30%;text-align: center" >
                    <span>{{row.author}}</span>
            </div>
            <div style="width: 30%;text-align: center" >
                    <span>{{row.publishdate}}</span>
            </div>
        </div>
    </template>
    <script>
    export default {
        name:'Item',
        props:{
            row:{
                type:Object,
                default:""
            },
            index:{
                type:Number,
                default:""
            }
        },
        mounted () {
    
        }
    }
    </script>