<template>
    <div class="modules-titles animated fadeInDown" >
            <span>{{title.nameLeft}}<span>{{title.nameRight}}</span></span>
            <div class="modules-division" ></div>
            <div>{{english}}</div>
            <div class="modules-even" v-if="ismany" >
                <router-link :to="{name:routeSkip}">
                        <span style="color:#8f9494;" >更多>></span>
                </router-link>
            </div>
   </div>
</template>

<script>
export default {
props:{
    title:{
        type:Object,
        default:{
            nameLeft:'新闻',
            nameRight:'动态'
        }
    },
    english:{
        type:String,
        default:''
    },
    ismany:{
        type:Boolean,
        default:true
    },
    routeSkip:{
        type:String,
        default:''
    }
}
}
</script>

