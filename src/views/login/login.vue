<template>
    <div>
            <el-dialog :title="dialogTitle"  :visible.sync="dialogVisible" width="400px" :append-to-body="true" top="250px" >
                <el-form :model="userInfo" status-icon :rules="userRules" ref="userForm" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                            <el-input placeholder="请输入用户名" v-model="userInfo.username" autocomplete="off" size="medium" @focus="usernameGetFouce" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                            <el-input placeholder="请输入密码" v-model="userInfo.password" show-password autocomplete="off" size="medium" @focus="pwdGetFocus" ></el-input>
                    </el-form-item>
                </el-form>
                <el-button style="width:100%" type="primary" round size="medium" :loading="subloading" @click="handleLogin" >登录</el-button>
                <div style="margin: 14px 0px 0px 10px" >
                    <span>没有账号?
                        <el-link type="primary" style="color: #1886d1;cursor: pointer;" >注册</el-link>
                    </span>
                </div>
                <div style="position: absolute;top:0%;width: 100%;" >
                    <img v-show="pawFocus" style="position: absolute;top: 0%;left: 50%;width: 10rem;transform: translate(-58%,-78%)" src="../../assets/images/blindfold.png" alt="">
                    <img v-show="userFocus" style="position: absolute;top: 0%;left: 50%;width: 10rem;transform: translate(-58%,-78%)" src="../../assets/images/greeting.png" alt="">
                    <img v-show="offFocus" style="position: absolute;top: 0%;left: 50%;width: 10rem;transform: translate(-58%,-78%)" src="../../assets/images/normal.png" alt="">
                </div>
            </el-dialog>    
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogTitle:'登录',
            dialogVisible:false,
            password:null,
            pawFocus:false,// 密码框获取焦点
            userFocus:false,// 用户名获取焦点
            offFocus:true,//全部失去焦点
            userInfo:{
                username:null,
                password:null,
            },
            userRules:{ //验证规则
                username:[
                    {required:true,message:"用户名不能为空",trigger:'change'}
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:'change'}
                ]
            },
            subloading:false,//登录状态
        }
    },
    methods:{
        handleShowDialog(){
            this.dialogVisible = !this.dialogVisible
        },
        //用户名获取焦点
        usernameGetFouce(e){
            console.log(e)
            this.pawFocus = false
            this.offFocus = false
            this.userFocus =true
        },
        //密码框获取焦点
        pwdGetFocus(){
            this.pawFocus = true
            this.offFocus = false
            this.userFocus =false
        },
        /**
         * 登录
         */
        handleLogin(){
            this.subloading = true;
            this.$refs.userForm.validate(valid => {
                if(valid){
                    this.$store.dispatch('user/login',this.userInfo).then(()=>{
                        this.subloading = false;
                        this.dialogVisible = false;
                        this.$message({
                            message:'欢迎您登录',
                            type:'success'
                        })
                    }).catch(error=>{
                        this.subloading = false;
                        this.$message.error(`${error}`)
                    })
                }
            })
        }
    },
    mounted(){
        
    }
}

</script>