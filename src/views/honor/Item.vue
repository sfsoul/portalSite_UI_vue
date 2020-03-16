<template>
    <div class="port-2 effect-2">
        <div class="image-box">
            <img :src="imageUrl" >
            <div style="position: absolute;bottom: 0%;width: 100%;color: #fff;background-color: rgba(209, 201, 200, 0.5);" >
                <h4>{{info.pepole}}</h4>
                <span>{{info.title}}</span>
            </div>
            
        </div>
        <div class="text-desc">
            <h3>{{info.pepole}}</h3>
            <p>{{info.honortitle}}</p>
            <div class="pan-btn light-blue-btn" @click="goDetail">
                 了解他
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            scrUrl:null,
        }
    },
    props:{
        info:{
            type:Object,
            default:{}
        }
    },
    computed: {
       imageUrl(){
             return `${process.env.VUE_APP_BASE_API}/${this.info.imageUrl}`
       } 
    },
    methods: {
        goDetail(){
            this.$router.push({name:"honor-details",params:{articleid:this.info.id}})
        }
    }
}
</script>

<style scoped  >
img{
    width: 100%;
    height: 100%;
    }
h3{
    font-size: 20px; 
    margin: 5px 0 10px;}
p{font-weight: 300;
 line-height: 20px;
 font-size: 14px;
 margin-bottom: 15px;}
.text-desc{
    position: absolute; 
    left: 0; 
    top: 0; 
    background-color: #fff; 
    height: 100%; 
    opacity: 0; 
    width: 100%;}

.port-2{float: left; width: 100%;height: 100%; position: relative;border-radius: 10px; overflow: hidden; text-align: center; border: 4px solid rgba(255, 255, 255, 0.9); perspective: 800px;}
.port-2 .text-desc{z-index: -1; transition: 0.6s;}
.port-2 .image-box{transition: 0.4s;width: 100%;height: 100%;position: relative;}
.port-2:hover .image-box{transform: rotateX(80deg); transform-origin: center bottom 0; transition: 0.4s;}

.port-2.effect-2 .text-desc{opacity: 1; top: -100%;}
.port-2.effect-2:hover .text-desc{top: 0;}
</style>