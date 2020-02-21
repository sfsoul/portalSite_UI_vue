<template>
    <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
        <notice-title titlea="通知" titleb="公告" english="Top Notices" :ismany="false" ></notice-title>
        <notice-item></notice-item>
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
import {NoticeItem,NoticeTitle} from '../notice'
export default {
    components:{
        NoticeItem,
        NoticeTitle
    },
    data(){
        return{
            pageSize:10,
            current:1,
            total:120,
            pageSizes:[10,20,30,40],
        }
    },
    methods:{
            // pagesize 变化回调
            handleSizeChange(val){

            },
            //current 变化回调
            handleCurrentChange(val){

            }
    }
}
</script>