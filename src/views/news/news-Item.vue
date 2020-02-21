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
            activeRow:null,
        }
    },
    props:{
        newsData:{
            type:Array,
            default:[]
        }
    },
    methods:{
        itemClick(e){
            this.activeRow = e
        },
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