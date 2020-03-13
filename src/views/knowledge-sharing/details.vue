<template>
        <div style="margin:100px 18% 20px 18%;" >
                <div >
                        <breadcrumd  ></breadcrumd>
                </div>
                <div v-if="detailsData"  style="background: #fff;padding: 20px;margin-top: 40px;">
                        <div style="text-align: center;" >
                            <h2>{{detailsData.title}}</h2>
                        </div>
                        <div style="text-align: center;" >
                            <span>{{detailsData.publishdate}}</span>
                            <span style="margin-left: 20px">发布人:{{detailsData.author}}</span>
                            <span style="margin-left: 20px" >浏览量:{{detailsData.pageview}}</span>
                        </div>
                        <div style="width: 100%;height: 100%;background: #fff;overflow: hidden;border-top: 1px solid #666;" >
                            <span v-html="detailsData.contentStr" ></span>
                        </div>


                        <div style="cursor: pointer;" >
                                <div style="height: 40px;background: #f3f1f1;line-height: 40px;" >
                                    <h3 style="margin-left:20px;" >附件</h3>
                                </div>
                                <div v-for="(item,index) in detailsData.annexes" :key="index" style="position: relative;height: 80px;" >
                                    <div style="position: absolute;font-size:50px;top: 50%;transform: translateY(-40%)" >
                                        <i class="el-icon-document"></i>
                                    </div>
                                    <div style="position: absolute;left: 6%;top: 20%;" >
                                        <span style="text-align:center" >{{item.name}}</span>
                                    </div>
                                    <div style="position: absolute;left: 6%;top: 60%" >
                                           <el-button type="primary" round  >预览</el-button>
                                           <el-button type="primary" round >下载</el-button>
                                    </div>
                                </div>
                         </div>
                </div>
        </div>
        
    </template>
    
    <script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getKnlgeShareDetail,fileDownload } from "@/api/knowledge-sharing"
import Long from "long" 
    export default {
        data(){
            return{
                detailsData:null,
            }
        },
        computed:{
            articleId(){
                return this.$route.params.articleid
            }
        },
        methods:{
            //获取分享详情
            handleGetKnlgeShareDetail(){
              const data = {
                   articleid:this.articleId,
                   type:0
                 
              }
              getKnlgeShareDetail(data).then(response=>{
                  if(response !== undefined && response){
                       response.annexes = response.annexes.map(item =>{
                           item.fid = (Long.fromValue(item.fid)).toString()
                           return item
                       })
                       this.detailsData = response
                       console.log(this.detailsData)
                       
                    }
              })
            },
        },
        mounted(){
            this.handleGetKnlgeShareDetail()
            let routes = [
                {
                  name:"知识共享",
                  path:'/knowledge-sharing'
                },
                {
                  name:"分享详情",
                  path:'/knowledge-sharing/details'
                  }
                ]
            this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        },
        components:{
            Breadcrumd
        }
    }
    </script>
    