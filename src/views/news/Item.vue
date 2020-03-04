<template>
    <router-link :to="{path:'news-show',query:{newsid:row.id}}" style="text-decoration: none;color:#1f1e1e;" >
            <div class="news-row"  ref="activeItem"  @mouseover="itemActive" >
                    <div class="news-row-date" >
                        <p>{{publishdate}}</p>
                    </div>
                    <!-- <div class="news-row-type">
                        <p>{{row.newsTName}}</p>
                    </div> -->
                    <div class="news-row-content" >
                        <p>{{row.title}}</p>
                    </div>
                </div>
    </router-link>
    
</template>

<script>
import {dateFormat} from '@/utils/commonality'
export default {
    data(){
        return {
            showItem:true,
            dateStyle:["年","月","日"],
        }
    },
    props:{
        row:{
            type:Object,
            default:{}
        },
        index:{
            type:Number,
            default:''
        }
    },
    computed: {
        publishdate(){
            return dateFormat(this.row.publishdate,this.dateStyle)
        }
    },
    methods:{
        itemActive(){
            this.$emit('itemActive',{index:this.index,row:this.row});
            if(this.$refs['activeItem'].parentNode !== undefined){
                let nodeList = [...this.$refs['activeItem'].parentNode.children]
                let node =  nodeList.filter((value)=>{
                   return  value.className.indexOf('news-row') > -1
                 }).map( item => {
                   item.classList.remove("showItem")
               })
            }
            
           
           /*  this.$refs['activeItem'].classList.add("showItem") */
        }
    },
    mounted(){
        let nodeList = [...this.$refs['activeItem'].parentNode.children]
        let node =  nodeList.filter((value)=>{
              return  value.className.indexOf('news-row') > -1
            })
         /*   node[0].classList.add("showItem") */
    }
}
</script>
<style>
.showItem {
    display: none;
}
</style>