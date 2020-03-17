<!--
 * @Author: your name
 * @Date: 2020-03-15 22:01:20
 * @LastEditTime: 2020-03-16 10:42:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\detail\index.vue
 -->
<template>
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
            <span v-html="detailsData.content" ></span>
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
                           <!-- <el-button type="primary" round  >预览</el-button> -->
                           <el-button type="primary" round @click="handleFileDownLoad(item)" >下载</el-button>
                    </div>
                </div>
         </div>
</div>
</template>
<script>
import { fileDownload } from '@/api/files'
import { download } from '@/utils/commonality'
import Long from "long" 
    export default {
        data(){
            return{
                detailsData:null,
                isLoading:false,
            }
        },
        watch: {
            isLoading(){
                this.$emit("emitIsLoading",this.isLoading)
            }
        },
        props:{
            detailId:{
                type:String
            },
            getDetail:{
                type:Function,
            },
            detailName:{
                type:String
            },
            
        },
        methods:{
            //获取分享详情
            handleGetKnlgeShareDetail(){
            let detailName = this.detailName
           
              const data = {}
              data[detailName] = this.detailId
              console.log(data)
              this.getDetail(data).then(response=>{
                  if(response !== undefined && response){
                       this.isLoading = true
                       response.annexes = response.annexes.map(item =>{
                           item.fid = (Long.fromValue(item.fid)).toString()
                           return item
                       })
                       this.detailsData = response
                       console.log(this.detailsData)
                    }
              })
            },
            //文件下载
            handleFileDownLoad(file){
                const fileId = (Long.fromValue(file.fid)).toString()
                fileDownload({fid:fileId}).then(response => {
                     download(response,file.name)
                })
                
            },
            
        },
        mounted(){
            this.handleGetKnlgeShareDetail()
            
        }
    }
    </script>