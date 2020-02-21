<template>
    <div style="width: 100%;" >
        <quality-title titlea="质量" titleb="信息" english="Quality Information" ></quality-title>
        <quality-item></quality-item>
    </div>
</template>

<script>
import { QualityTitle,QualityItem } from '../quality'
export default {
    components:{
        QualityItem,
        QualityTitle
    },
    mounted(){
       
    }
}


</script>