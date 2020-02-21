<template>
        <div style="cursor: pointer;" >
                <div style="height: 40px;background: #f3f1f1;line-height: 40px;" >
                    <h3 style="margin-left:20px;" >附件</h3>
                </div>
                <div style="position: relative;height: 80px;" >
                    <div style="position: absolute;font-size:50px;top: 50%;transform: translateY(-40%)" >
                        <i class="el-icon-document"></i>
                    </div>
                    <div style="position: absolute;left: 6%;top: 20%;" >
                        <span style="text-align:center" >如何高效的学习.doc</span>
                    </div>
                    <div style="position: absolute;left: 6%;top: 60%" >
                           <el-button type="primary" round  >预览</el-button>
                           <el-button type="primary" round >下载</el-button>
                    </div>
                </div>
        </div>
</template>

<script>
export default {
      data(){
          return {

          }
      },
      props:{
          
      }
}
</script>