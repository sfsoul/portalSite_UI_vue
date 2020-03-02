<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-02-29 16:06:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\layout\index.vue
 -->
<template>
    <div >
        <!---导航栏-->
        <div style="position:fixed;top: 0px;width: 100%;background-color: #fff;z-index: 1000;" >
            <div style="position: relative;width: 100%;" >
                 <horizontal-menu></horizontal-menu>
            </div>
                
        </div>
        <div style="margin-top: 60px;" >
                   <app-main></app-main>
            <footer-view></footer-view>
        </div>

        <!--回到顶部-->
        <back-to-top  :visibility-height="300" :back-position="50" transition-name="fade" />
    </div>
</template>

<script>
import { AppMain,HorizontalMenu,FooterView } from './components'
import { mapState } from 'vuex'
import BackToTop from '@/components/backToTop.vue'
export default {
    name:'Layout',
    data(){
        return{

        }
    },
    components:{
        AppMain,
        HorizontalMenu,
        FooterView,
        BackToTop
    },
    computed:{

    },
    mounted(){
        this.$store.dispatch('permission/generateRoutes',['admin'])
    }

}
</script>