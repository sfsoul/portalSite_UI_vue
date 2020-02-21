<template>
        <el-breadcrumb separator="/">
           <!--  <transition-group name="breadcrumb"> -->
              <el-breadcrumb-item v-for="(item,index) in breadcrumd_routes" :key="item.path">
                <router-link :to="{path:item.path}">
                    <span>{{item.name}}</span>
                </router-link>
              </el-breadcrumb-item>
        <!--     </transition-group> -->
          </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters([
          'breadcrumd_routes'
        ])
    }
}
</script>