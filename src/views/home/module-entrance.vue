<template>
    <div style="margin-top: 40px" class="module-content"   >
        <el-row :gutter="1" justify="space-between" type="flex"> 
            <el-col :span="12" v-for="(item,index) in rowBottom" :class="item.colClass" :key="index" >
                <router-link :to="item.linkTo" >
                        <div :class="item.colConClass">
                                <img :src="item.colImgSrc" alt="" class="module-content-img" >
                                <h4 style="color: rgb(223, 245, 124)" >{{item.title}}</h4>
                                <h5 class="module-title" >{{item.content}}</h5>
                                <h5 class="module-title" >点击查看</h5>
                                <div class="module-footer"></div>
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

            rowBottom:[
            {
                    linkTo:{name:'project-list'},
                    colClass:['module-project-content'],
                    colConClass:['module-item'],
                    colImgSrc: require('@/assets/images/培训专栏.png'),
                    title:'培训专栏',
                    content:'一些公司培训相关的文档'
                },
                {
                    linkTo:{name:'institution'},
                    colClass:['module-project-content'],
                    colConClass:['module-item'],
                    colImgSrc:require('@/assets/images/知识共享.png'),
                    title:'知识共享',
                    content:'发布一些工作经验，知识建设'
                },
                {
                    linkTo:{name:'institution'},
                    colClass:['module-project-content'],
                    colConClass:['module-item'],
                    colImgSrc:require('@/assets/images/制度文档.png'),
                    title:'制度文档',
                    content:'一些公司制度相关的文档'
                }
            ],
          
        }
    },
    computed: {
        scrollTop(){
            return this.$store.getters.scroll_top || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
        }
    },
    watch:{
        scrollTop(){
            if(this.scrollTop >= 800){
                this.rowBottom.map(item =>{
                     return item.colClass = ['module-project-content','animated','fadeIn','animatedDely']
                })
            }
            if(this.scrollTop <= 700){
                this.rowBottom.map(item =>{
                     return item.colClass = [['module-project-content','animated','bounceOutLeft']]
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
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
    top: 20%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
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
.animatedDely {
    animation-delay: 1s;
}

</style>