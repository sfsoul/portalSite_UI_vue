<template>
    <div class="news-item-active" >
        <div class="news-item-active-date" >
            <div class="new-item-day" >
                <span>{{day}}</span>
            </div>
            <div>
                <span>{{year}}</span>
            </div>
        </div>
        <div  class="new-item-content" >
            <div class="content-title" >
                <span v-if="row" >{{row.row.title}}</span>
            </div>
            <div class="news-item-content" >
                <span v-if="row" >{{row.row.summary}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            day:null,
            year:null,
        }
    },
    props:{
        row:{
            type:Object,
            default:{
                index:0,
                row:{
                    title:null,
                    content:null,
                    publishdate:null
                }
            }
        }
    },
    watch:{
        row(){
              if(this.row.row !== undefined){
                
                let date = this.row.row.publishdate.split(" ")
                date = date[0].split("-")
                let len = date.length
                this.day = date[len - 1]
                this.year = `${date[1]}.${date[0]}`
              }
               
                this.$emit("images",this.row)
        }
    }
}
</script>