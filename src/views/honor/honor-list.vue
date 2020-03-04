<template>
    <div  style="margin: 100px 18% 40px 18%">
            <honor-title :title="title" english="Company Honors"  :ismany="false"  ></honor-title>
            <honor-item></honor-item>
            <el-pagination
                   background 
                  :page-size="pageSize"
                  :total="total"
                  :current-page="current"
                  layout="total,sizes,prev,pager,next,jumper"
                  :page-sizes="pageSizes"
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
                </el-pagination>
    </div>
</template>
<script>
import {HonorItem } from './index'
import HonorTitle from '@/components/title'
export default {
    data(){
        return {
            pageSize:10,
            current:1,
            total:120,
            pageSizes:[8,16,32],
            title:{
                nameLeft:'荣誉',
                nameRight:'中亚'
            }
        }
    },
    methods:{
        // pagesize 变化回调
        handleSizeChange(val){

         },
       //current 变化回调
        handleCurrentChange(val){

        }
    },
    components:{
        HonorTitle,
        HonorItem
    },
    mounted(){
    }
}
</script>