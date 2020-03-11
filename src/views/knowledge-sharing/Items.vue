<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-11 12:06:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\knowledge-sharing\Items.vue
 -->
<template>
        <div v-if="row" >
               
                         <div v-if="!isMyKnow" style="display: flex;justify-content: space-between;flex-wrap: nowrap;margin: 20px 0px;font-size: 14px;cursor: pointer;" >
                                <router-link :to="{name:'knowledge-details',params:{articleid:row.id}}" style="text-decoration: none;width: 70%;" >
                                <div style="width: 100%;line-height:34px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #535151;" >
                                        <span>{{row.title}}</span>
                                </div>
                              </router-link>
                                <div style="font-weight: 700;" >
                                        <span>{{row.author}}</span>   
                                </div>
                              
                                <div>
                                        <span>{{row.publishdate}}</span>
                                </div>
                          </div>
                          <div v-else style="display: flex;justify-content: space-between;flex-wrap: nowrap;margin: 20px 0px;font-size: 14px;cursor: pointer;color: #535151;">
                                <router-link :to="{name:'knowledge-details',params:{articleid:row.id}}" style="text-decoration: none;width:40% ;" >
                                <div style="width: 100%;line-height:34px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #535151;" >
                                        <span>{{row.title}}</span>
                                </div>
                              </router-link>
                                <div style="font-weight: 700;" >
                                        <span>{{row.author}}</span>   
                                </div>
                             
                                <div>
                                        <span>{{row.publishdate}}</span>
                                </div>
                                <div>
                                        <span>{{row.reviewstatusStr}}</span>
                                </div>
                                <div >
                                        <div class="pan-btn light-blue-btn" @click="handleUpdate(row)">
                                                修改
                                        </div>
                                        <div class="pan-btn light-blue-btn" @click="handleDelete(row)">
                                                删除
                                        </div>
                                </div>
                                
                          </div>
               
    
        </div>
       
    </template>
    <script>
   import { deleteKnlgeShare } from "@/api/knowledge-sharing"
    export default {
        name:'Item',
        props:{
           row:{
               type:Object,
               default:null,
           },
           isMyKnow:{
                type:Boolean,
                default:false
           },
           getMyKnowledge:{
                type:Function
           }
        },
        methods: {
                handleUpdate(row){
                        if(row.reviewstatus && row.reviewstatus !==null){
                                this.$message.warning("审核通过,不能修改")
                                return ;
                        }
                        this.$router.push({name:"release",params:{row:row.id}})    
                },
                handleDelete(row){
                        if(row.reviewstatus){
                                this.$message.warning("审核通过,不能删除")
                                return ;
                        }
                        this.$confirm("该文章正在审核中,是否要删除?","提示",{
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                        }).then(()=>{
                                deleteKnlgeShare(row.id).then(response=>{
                                        this.getMyKnowledge()
                                        this.$message.success("删除成功")
                                })
                        })
                }        
        },

    }
    </script>
    <style>
        .noClick{
                pointer-events: none;
        }
    </style>