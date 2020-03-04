<template>
    <div style="margin-top: 20px;" >
        <div style="display: flex;justify-content: space-between;flex-wrap: nowrap" >
           <div style="width: 38px;text-align: center" >
               <span>序号</span>
           </div>
           <div  style="width: 30%;text-align: center" >
               <span>标题</span>
           </div>
           <div style="width: 30%;text-align: center" >
               <span>发布人</span>
           </div>
           <div style="width: 30%;text-align: center">
               <span>发布时间</span>
           </div>
           </div>
        <item v-for="(notice,index) in noticeData" :notice="notice" :key="index" :index="index" ></item>
    </div>
</template>

<script>
import { Item } from "./index"
export default {
    components:{
        Item
    },
    props:{
        noticeData:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
    
        }
    }
}
</script>