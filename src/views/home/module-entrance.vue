<template>
    <div style="margin-top: 40px" class="module-content"  >
        <el-row :gutter="1" justify="space-between" type="flex"> 
            <el-col :span="12" class="module-project-content" >
                <router-link :to="{name:'project-list'}" >
                        <div class="module-item" >
                                <img src="../../assets/images/项目进度.png" alt="" class="module-content-img" >
                                <h4 style="color: rgb(223, 245, 124)" >项目进度</h4>
                                <h5 class="module-title" >一些公司培训相关的文档</h5>
                                <h5 class="module-title" >点击查看</h5>
                                <div class="module-footer"></div>
                            </div>
                </router-link>
               
            </el-col>
            <el-col :span="12" class="module-project-content">
                    <router-link :to="{name:'institution'}" >
                            <div class="module-content-right" >
                                    <img src="../../assets/images/制度文档.png" alt="" class="module-content-img"" >
                                    <h4 style="color: rgb(223, 245, 124)" >制度文档</h4>
                                    <h5 class="module-title" >一些公司制度相关的文档</h5>
                                    <h5 class="module-title" >点击查看</h5>
                                    <div class="module-footer"></div>
                           </div>
                    </router-link>
                    
            </el-col>
        </el-row>
        <el-row :gutter="1" justify="space-between" type="flex"> 
                <el-col :span="12" class="module-project-content" >
                    <router-link :to="{name:'train-list'}">
                            <div class="module-item" >
                                    <img src="../../assets/images/培训专栏.png" alt="" class="module-content-img"" >
                                    <h4 style="color: rgb(223, 245, 124)" >培训专栏</h4>
                                    <h5 class="module-title" >一些公司培训相关的文档</h5>
                                    <h5 class="module-title" >点击查看</h5>
                                    <div class="module-footer"></div>
                            </div>
                    </router-link>
                    
                </el-col>
                <el-col :span="12" class="module-project-content">
                        <router-link :to="{name:'knowledge-sharing'}">
                        <div class="module-content-right" >
                                <img src="../../assets/images/知识共享.png" alt="" class="module-content-img"" >
                                <h4 style="color: rgb(223, 245, 124)" >知识共享</h4>
                                <h5 class="module-title" >发布一些工作经验，知识建设</h5>
                                <h5 class="module-title" >点击查看</h5>
                                <div class="module-footer" ></div>
                       </div>
                    </router-link>
                </el-col>
            </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    }
}
</script>

<style scoped>
.module-content {
    background-image: url('../../assets/images/beijing.png');
    font-size: 14px;
}
.module-project-content {
    height: 300px;
    position: relative;
    border-bottom: 1px solid #fff;
    border-right:1px solid #fff;
    cursor: pointer;
  
}
.module-item {
    position: absolute;
    right: 16%;
    top: 16%;
    text-align: center;
    color: #fff;
    transition: all 1s;
}
.module-item:hover {
    transform: scale(1.1)
}
.module-content-img {
    width: 30px;
    height: 30px;
}
.module-title {
    font-size: 12px;
}
.module-content-right {
    position: absolute;
    left: 16%;
    top: 16%; 
    text-align: center;
    color: #fff;
    transition: all 1s;
}
.module-content-right:hover {
    transform: scale(1.1)
}
.module-footer {
    width: 30px;
    background-color: rgb(241, 237, 237);
    height: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 1s cubic-bezier(.46, 1, .23, 1.52) ;
}
.module-title:hover+ .module-footer {
    width: 80px;
}
</style>