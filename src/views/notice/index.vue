<template>
    <div >
        <notice-title :title="title"  english="Top Notices" :isSearch="false" routeSkip="notice-trends" ></notice-title>
        <notice-item v-if="isNotice" :noticeData="noticeData"></notice-item>
        <div v-else style="min-height: 400px;position: relative;">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { NoticeItem } from '../notice'
import NoticeTitle from '@/components/title'
import { getNoticeList } from '@/api/notice'
import Loading from '@/components/loading'
export default {
    components:{
        NoticeTitle,
        NoticeItem,
        Loading
    },
    data(){
        return {
            title:{
                nameLeft:'通知',
                nameRight:'公告'
            },
            noticeData:null,
            isNotice:false,
        }
    },
    methods: {
        //获取通知列表
        handleGetNoticeList(current,pageSize){
                 getNoticeList(current,pageSize).then(response=>{
                     this.isNotice = true
                    response.value.map(item => {
                        item.id = BigInt(item.id)
                    })
                    this.noticeData = response.value
                 })
            }
    },
    mounted () {
        this.handleGetNoticeList(1,6)
    }
}
</script>