<template>
        <div  class="modules-titles animated fadeInDown" >
                <span >{{titlea}}<span>{{titleb}}</span></span>
                <div class="modules-division" ></div>
                <div>{{english}}</div>
                <div class="modules-even" v-if="ismany" >
                        <router-link :to="{name:'notice-trends'}">
                                <span style="color:#8f9494;" >更多>></span>
                        </router-link>
                </div>
       </div>
</template>

<script>
export default {
    props:{
        titlea:{
            type:String,
            default:''
        },
        titleb:{
            type:String,
            default:''
        },
        english:{
            type:String,
            default:''
        },
        ismany:{
            type:Boolean,
            default:true,
        }
    }
}
</script>