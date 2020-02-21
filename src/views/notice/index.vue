<template>
    <div >
        <notice-title titlea="通知" titleb="公告" english="Top Notices" ></notice-title>
        <notice-item></notice-item>
    </div>
</template>

<script>
import { NoticeTitle,NoticeItem } from '../notice'
export default {
    components:{
        NoticeTitle,
        NoticeItem
    }
}
</script>