<template>
    <div >
        <el-row :gutter="20" justify="space-between" >
            <el-col style="height:300px" class="animated fadeInUp" :span="6" v-for="(info,index) in honourDataList" :key="index"  >
                <item  :info="info" ></item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import  Item  from './Item'
export default {
    components:{
        Item
    },
    props:{
        honourDataList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
           
        }
    }
}
</script>