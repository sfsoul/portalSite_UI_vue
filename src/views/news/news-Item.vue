<template>
    <div style="position: relative;display: flex;flex-direction: column" >
        <item-active :row="activeRow" @images="receptionImage" ></item-active>
        <item v-for="(news,index) in newsData" :row="news" :index="index" :key="index" @itemActive="itemClick"  ></item>
    </div>
</template>

<script>
import Item from './Item'
import ItemActive from './Item-active'
export default {
    components:{
        Item,
        ItemActive,
    },
    data(){
        return{
            activeRow:null,//选中新闻信息
        }
    },
    props:{
        //展示的新闻列表信息
        newsData:{
            type:Array,
            default:[]
        }
    },
    methods:{
        itemClick(e){
            this.activeRow = e
        },
        //发送选中的信息
        receptionImage(e){
           this.$emit("imageToDetails",e)
        }
    },
    mounted(){
        let firstRow = this.newsData[0]
        this.activeRow = {index:0,row:firstRow}
    }
}
</script>