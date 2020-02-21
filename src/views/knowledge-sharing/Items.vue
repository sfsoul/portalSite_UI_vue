<template>
        <div>
                <router-link :to="{name:'knowledge-details',params:{row}}" style="text-decoration: none" >
                        <div style="display: flex;justify-content: space-between;flex-wrap: nowrap;margin: 20px 0px;font-size: 14px;cursor: pointer;color: #535151;" >
            
                                <div style="width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis" >
                                        <span>{{row.title}}</span>
                                </div>
                                <div>
                                        <span>{{row.date}}</span>
                                </div>
                          </div>
                </router-link>
    
        </div>
       
    </template>
    <script>
    export default {
        name:'Item',
        props:{
           row:{
               type:Object,
               default:null,
               
           }
        }
    }
    </script>