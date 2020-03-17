<template>
        <div>
                <div class="news-details" v-if="activeInfo">
                        <img :src="scrUrl" alt=""  >
                        <p >{{activeInfo.title}}</p>
                        <span style="position: absolute;bottom: 15%;left:50%;transform: translateX(-50%); color: #ffffff;" >
                                {{activeInfo.summary}}
                        </span>
                            
                </div>
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