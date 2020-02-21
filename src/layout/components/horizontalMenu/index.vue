<template>
    <div class="navbar" >
      <logo></logo>
        <el-menu
           mode="horizontal"
           background-color="#fff"
           text-color="#000"
           active-text-color="#49aff3"
           :unique-opened="true"
           :default-active="activeMenu"
           router
        >
        <nav-menu v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" ></nav-menu>
     </el-menu>
    
        <el-input v-model="searchVlaue"  class="header-search" placeholder="请输入" >
          <template slot="append">
              <i class="el-icon-search" style="color: #fff" @click="searchEnter" ></i>
          </template>
        </el-input>
    
     <div class="header-login" >
           <div class="pan-btn light-blue-btn" @click="showLogin">
             去登录
           </div>
     </div>
     <login ref="login" ></login>
    </div>
</template>

<script>
import path from 'path'
import {mapGetters} from 'vuex'
import NavMenu from './NavMenu'
import Item from './Item'
import Logo from './Logo'
import Login from '@/views/login/login'
export default {
    data(){
        return{
          onlyOneChild:[],
          searchVlaue:null,
        }
    },
    components:{
        Item,
        NavMenu,
        Logo,
        Login
    },
    computed: {
      ...mapGetters([
         'permission_routes',
       ]),
        activeMenu(){
          const route = this.$route
          const { meta,path } = route
          if(meta.activeMenu){
            return meta.activeMenu
          }
          return path
        }
    },
    methods:{
      // 显示登录框
      showLogin(){
        this.$refs['login'].handleShowDialog()
      },
      //跳转
      searchEnter(){
        this.$router.push({path:'/search'})
      }
    },
    mounted(){
    }
}

</script>