<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-03 17:46:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\notice\notice-trends.vue
 -->
<template>
    <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
        <notice-title :title="title"  english="Top Notices"  :ismany="false" ></notice-title>
        <notice-item v-if="isNoticeLoading" :noticeData="noticeData"></notice-item>
        <div v-else style="min-height: 550px;position: relative;">
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isNoticeLoading" style="min-height: 550px;position: relative;">
            <no-data></no-data>
       </div>
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
import {NoticeItem} from '../notice'
import NoticeTitle from '@/components/title'
import { getNoticeList } from '@/api/notice'
import Loading from '@/components/loading'
import NoData from '@/components/noData'
export default {
    components:{
        NoticeItem,
        NoticeTitle,
        Loading,
        NoData
    },
    data(){
        return{
            pageSize:10,
            current:1,
            total:0,
            pageSizes:[10,20,30,40],
            noticeData:[],
            title:{
                nameLeft:"通知",
                nameRight:"公告"
            },
            isNoData:false,
            isNoticeLoading:false,
        }
    },
    methods:{
            // pagesize 变化回调
            handleSizeChange(val){

            },
            //current 变化回调
            handleCurrentChange(val){

            },
            //获取通知列表
            handleGetNoticeList({current=this.current,pageSize=this.pageSize}={}){
                 getNoticeList(current,pageSize).then(response=>{
                    if(response.value.length > 0){
                        this.isNoData = true
                    }
                    this.isNoticeLoading = true
                    let page = response.page;
                    response.value.map(item => {
                        item.id = BigInt(item.id)
                    })
                    this.total = page.total
                    this.noticeData = response.value
                 })
            }
    },
    mounted () {
        this.handleGetNoticeList()
    }
}
</script>