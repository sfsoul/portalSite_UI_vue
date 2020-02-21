<template>
  
    <div class="persion-content" >
        <div class="persion-intro" >
                <p>{{info.name}}</p>
                <p>{{info.honor}}</p>
        </div>
        <router-link :to="{name:'honor-details',params:{info}}" >
        <div class="persion-details"  >
            
                    <div class="persion-details-content" >
                            <p>{{info.name}}</p>
                            <p class="persion-content-p" >{{info.content}}</p>
                            <span style="position: absolute;right: -16px;bottom: 20px;">...</span>
                     </div>
        </div>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        info:{
            type:Object,
            default:{}
        }
    }
}
</script>

<style scoped lang="scss" >
.persion-intro {
    position: absolute;
    bottom: 0%;
    text-align: center;
    width: 100%;
    height: 29%;
    background-color: rgba(243, 247, 250, 0.5);
    
}
.persion-content {
    position: relative;
    height: 260px;
    background-image:url('../../assets/images/beijing.png');
    cursor: pointer;
  
}
.persion-content:hover .persion-details{
    opacity: 1;
    box-shadow: 1px 6px 20px 1px #666;
}

.persion-details {
    width: 100%;
    height: 100%;
    background-color: rgba(24, 131, 202,0.8);
    position: absolute;
    top:0%;
    opacity: 0;
    text-align: center;
    color: #fff;
}
.persion-details-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.persion-content-p {
   /*  display: -webkit-box;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -moz-line-clamp:4; */
    position: relative;
    line-height: 20px;
    overflow: hidden;
    max-height: 60px;
}
.persion-content-p::after {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 40px;
 /*    background: -webkit-linear-gradient(left,transparent,#fff 55%);
    background: -o-linear-gradient(right,transparent,#fff 55%);
    background: -moz-linear-gradient(right,transparent,#fff 55%);
    background: linear-gradient(to right,transparent,#fff 55%) */
}

</style>