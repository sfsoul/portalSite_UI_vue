<template>
    <div >
        <el-row :gutter="20" justify="space-between" >
            <el-col style="height:300px" class="animated fadeInUp" :span="6" v-for="(info,index) in honourDataList" :key="index"  >
                <items  :info="info" ></items>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import  Item  from './Item'
import Items from "./items"
export default {
    components:{
        Items
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