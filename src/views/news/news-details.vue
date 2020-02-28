<template>
        <div class="news-details">
                <img :src="scrUrl" alt=""  >
                <p  v-if="activeInfo" >{{activeInfo.titile}}</p>
                    
        </div>
</template>

<script>
export default {
        data(){
                return{
                        scrUrl:null,
                }
        },
        props:{
                activeInfo:{
                        type:Object,
                        default:{}
                }
        },
        computed: {
        },
        watch: {
                activeInfo(){
                        this.scrUrl = `${process.env.VUE_APP_BASE_API}/${this.activeInfo.imageUrl}`
                }
        }
}
</script>