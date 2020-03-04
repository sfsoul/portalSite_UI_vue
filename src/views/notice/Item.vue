<template>
    <div style="display: flex;justify-content: space-between;flex-wrap: nowrap;font-size: 14px;margin: 20px 0px;color: #535151;" >
        <div style="width: 18px;height: 16px;background-color:#1886d1;color: #fff;text-align: center" >
            <span>{{index + 1}}</span>
        </div>
       
        <div style="width: 30%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center" >
                <router-link :to="{name:'notice-show',params:{noticeid:notice.id}}" style="text-decoration: none;color: #222;" >
                        <span>{{notice.title}}</span>
                </router-link>
              
        </div>
        <div style="width: 30%;text-align: center" >
                <span>{{notice.author}}</span>
        </div>
        <div style="width: 30%;text-align: center" >
                <span>{{notice.publishdate}}</span>
        </div>
    </div>
</template>
<script>
import {dateFormat} from '@/utils/commonality'
export default {
    props:{
        notice:{
            type:Object,
            default:''
        },
        index:{
            type:Number,
            default:''
        }
    },
    mounted () {
         this.notice.publishdate = dateFormat( this.notice.publishdate,this.dateStyle)
    },
    data(){
        return{
            dateStyle:["/","/"],
        }
    }
}
</script>