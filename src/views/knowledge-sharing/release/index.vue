<!--
 * @Author: your name
 * @Date: 2020-03-02 17:41:06
 * @LastEditTime: 2020-03-02 17:41:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\knowledge-sharing\release\index.vue
 -->
<template>
    <div style="margin:100px 18% 20px 18%;" >
        <div >
                <breadcrumd  ></breadcrumd>
        </div>
        <el-form :model="knowledgeObject" :rules="knowledgeRules" ref="knowledgeForm" label-width="160px">
            <div style="margin-top:50px ;" >
                <el-form-item label="标题" prop="title" style="font-size: 26px;" >
                    <el-input v-model="knowledgeObject.title" style="width: 40%;" ></el-input>
                </el-form-item>
            </div>
            <div style="width: 80%;position: relative;">
                <div style="width: 160px;text-align: right;height: 40px;position: absolute;box-sizing: border-box;color:#606266;font-size:14px" >
                    <span style="margin-right: 10px;" >文章内容:</span>
                </div>
               
                <editor @editorContent="handleEditorContent" ></editor>
            </div>
            <div style="width: 46%;">
                <el-form-item label="上传附件" prop="annexes" >
                    <el-upload
                      ref="upload"
                      multiple
                      :headers="headers"
                      :http-request="httpRequestFiles"
                      :before-remove="beforeRemoveFiles"
                      :action="actionApi"
                      :on-error="handleUploadFileError"
                    >
                      <div class="eladmin-upload"><i class="el-icon-upload" /> 添加文件</div>
                      <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
                    </el-upload>
                  </el-form-item>
            </div>
            <div style="text-align: center;">
                <el-button :loading="submitLoading" type="primary" size="medium" @click="submitKnowledge">发布</el-button>
            </div>
            
        </el-form>
       
</div>
</template>

<script>
import Breadcrumd from '@/components/breadcrumd.vue'
import Editor from "@/components/editor"
import { getToken } from '@/utils/auth'
import { fileUpload, fileDelete } from '@/api/files'
import { addKnlgeShare,isExistTitle } from '@/api/knowledge-sharing'
import Long from 'long'
    export default {
        data(){
            return {
                knowledgeObject:{
                    title:null,
                    contentStr:null,
                    annexes:[]
                },
                knowledgeRules:{
                    title:[
                        {required:true,message:"请填写文章标题",change:"blur"}
                    ]
                },
                headers: {
                   'Authorization': getToken()
                 },
                actionApi:`${process.env.VUE_APP_BASE_API}/api/files/upload`,//文件上传地址
                fileList:[],//已上传文件列表
                submitLoading:false,

            }
        },
        mounted () {
            let routes = [
                {
                  name:"知识共享",
                  path:'/knowledge-sharing'
                },
                {
                  name:"分享经验",
                  path:'/knowledge-sharing/details'
                  }
                ]
            this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        },
        methods: {
            //新闻内容
          handleEditorContent(value){
              this.knowledgeObject.contentStr = value
          },
          //检验标题是否重复
          handleRepetitionTitle({title=this.knowledgeObject.title}={}){
            isExistTitle(title).then(response=>{
                console.log(response)
            })
          },
          //自定义上传文件
          httpRequestFiles(value){
              const formdata = new FormData()
              formdata.append("myfile",value.file)
              fileUpload(formdata).then(response=>{
                  this.fileList.push(
                      {
                          fid:(Long.fromValue(response.fid)).toString(),
                          name:response.name,
                          path:response.path
                      }
                  )
              })
          },
          //删除文件之前
          beforeRemoveFiles(file,filelist){
              this.fileList.forEach((item,index) =>{
                  if(item.name === file.name){
                    fileDelete(item).then(response=>{
                        this.fileList.splice(index,1)
                    })
                  }
              })
              return true;
          },
        // 发布
        submitKnowledge(){
            this.$refs.knowledgeForm.validate(valid => {
                this.handleRepetitionTitle()
                this.submitLoading = true
                if(valid){
                    this.knowledgeObject.annexes = this.fileList
                    this.knowledgeObject.annexes.forEach(item=>{
                        delete(item.name)
                        delete(item.path)
                    })

                    addKnlgeShare(this.knowledgeObject).then(response => {
                        this.submitLoading = false
                        this.fileList = []
                        this.$confirm('您发布的文章正在审核中,是否返回知识分享界面', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'info',
                            center: true
                           }).then(() => {
                               this.$router.push({name:"knowledge-sharing"})
                            });
                           })

                     
                }
                else{
                    this.$message.error("请按规则填写")
                    this.submitLoading = false
                }
            })
           
        },
        //监听文件上传错误
        handleUploadFileError(err,file,filelist){
            const msg = JSON.parse(err.message)
            this.$notify({
                title:"文件上传错误",
                message:msg.message,
                type:'error',
                duration:2500
            })
        }
        },
        components:{
            Breadcrumd,
            Editor
        }
    }
</script>

<style  >
.el-form-item__label {
    font-size: 14px !important;
}
.upload {
    height: 60px;
    width: 200px;
    border: 1px solid #666;
}
.eladmin-upload {
  border: 1px dashed #c0ccda;
  border-radius: 5px;
  height: 45px;
  line-height: 45px;
  width: 368px;
}
</style>