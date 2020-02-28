<template>
    <router-link :to="{name:'news-show',params:{row:row}}" style="text-decoration: none;color:#1f1e1e;" >
            <div class="news-row"  ref="activeItem"  @mouseover="itemActive" >
                    <div class="news-row-date" >
                        <p>{{row.date}}</p>
                    </div>
                    <div class="news-row-content" >
                        <p>{{row.title}}</p>
                    </div>
                </div>
    </router-link>
    
</template>

<script>
export default {
    data(){
        return {
            showItem:true,
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
    methods:{
        itemActive(){
            this.$emit('itemActive',{index:this.index,row:this.row});
            let nodeList = [...this.$refs['activeItem'].parentNode.children]
            let node =  nodeList.filter((value)=>{
              return  value.className.indexOf('news-row') > -1
            }).map( item => {
                item.classList.remove("showItem")
            })
           
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