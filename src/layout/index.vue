<template>
    <div >
        <!---导航栏-->
        <div style="position:fixed;top: 0px;width: 100%;background-color: #fff;z-index: 1000;min-width: 1200px;" >
            <div style="position: relative;" >
                 <horizontal-menu></horizontal-menu>
            </div>
                
        </div>
        <div style="margin-top: 60px;" >
                   <app-main></app-main>
            <footer-view></footer-view>
        </div>
     
    </div>
</template>

<script>
import { AppMain,HorizontalMenu,FooterView } from './components'
import { mapState } from 'vuex'
export default {
    name:'Layout',
    data(){
        return{

        }
    },
    components:{
        AppMain,
        HorizontalMenu,
        FooterView
    },
    computed:{

    },
    mounted(){
        this.$store.dispatch('permission/generateRoutes',['admin'])
    }

}
</script>