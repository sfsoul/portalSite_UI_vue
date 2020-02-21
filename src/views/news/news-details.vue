<template>
        <div class="news-details">
                <img src="../../assets/images/banner.png" alt=""  >
                <p  v-if="activeInfo" >{{activeInfo.row.title}}</p>
                    
        </div>
</template>

<script>
export default {
        data(){
                return{

                }
        },
        props:{
                activeInfo:{
                        type:Object,
                        default:{}
                }
        }
}
</script>