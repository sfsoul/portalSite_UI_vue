<template>
        <div class="news-details" v-if="activeInfo">
                <img :src="scrUrl" alt=""  >
                <p >{{activeInfo.title}}</p>
                <span style="position: absolute;top: 40%;left:50%;transform: translate(-50%,-40%);color: #ffffff;" >
                        {{activeInfo.summary}}
                </span>
                    
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
                        console.log(this.activeInfo)
                        this.scrUrl = `${process.env.VUE_APP_BASE_API}/${this.activeInfo.imageUrl}`
                }
        }
}
</script>