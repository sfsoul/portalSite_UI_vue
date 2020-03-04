<template>
    <div style="width: 100%;" >
        <quality-title :title="title" english="Quality Information" :isSearch="false" routeSkip="quality-list"  ></quality-title>
        <quality-item></quality-item>
    </div>
</template>

<script>
import { QualityItem } from '../quality'
import QualityTitle from '@/components/title'
export default {
    components:{
        QualityItem,
        QualityTitle
    },
    mounted(){
       
    },
    data(){
        return {
            title:{
                nameLeft:"质量",
                nameRight:"信息"
            }
        }
    }
}


</script>