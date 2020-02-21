<template>
        <div style="margin: 100px 18%" >
            <breadcrumd></breadcrumd>
            <div style="height: 100px;background: #fff;line-height: 40px;min-width: 1000px;" >
                <div>
                    <h2 style="text-align: center" >公告标题</h2>
                </div>
                <div style="text-align: center;" >
                    <span>2019/12/12</span>
                    <span style="margin-left: 20px" >发布人:张珊</span>
                    <span style="margin-left: 20px" >浏览量:1250</span>
                </div>
            </div>
            <div>
    
            </div>
        </div>
    </template>
    
    <script>
 import Breadcrumd from '@/components/breadcrumd.vue'       
 export default {
        props:{
            
        },
        components:{
            Breadcrumd
        },
        mounted(){
            let routes = [
            {
              name:"公告列表",
              path:'/notice/notice-trends'
            },
            {
              name:"公告详情",
              path:'/notice/notice-show'
              }
            ]
           this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        }
    }
    </script>
    
    <style>
    
    </style>