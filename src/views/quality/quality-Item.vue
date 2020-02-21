<template>
    <div style="width:100%" >
        
        <item v-for="(quality,index) in qualityData" :key="index" :title="quality.title" :date="quality.date" ></item>
    </div>
</template>
<script>
import Item from './Item'
export default {
    name:'QualityItem',
    components:{
        Item
    },
    data(){
        return {
            qualityData:[
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                {
                    title:"关于中亚2015年的工作规划和动员大会开始成都中亚通茂股份有限公司",
                    date:'2019/12/12'
                },
                
            ]
        }
    }
}
</script>