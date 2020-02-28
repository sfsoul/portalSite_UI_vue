<template>
    <div>
        <el-row :gutter="20" justify="space-between" >
            <el-col class="animated fadeInUp" :span="6" v-for="(info,index) in persionInfos" :key="index" style="margin-bottom: 20px;" >
                <item  :info="info" ></item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import  Item  from './Item'
export default {
    components:{
        Item
    },
    data(){
        return {
            persionInfos:[
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习'
                },
                {
                    name:'张珊',
                    honor:'优秀领导者',
                    content:'天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习天天向上，努力学习'
                },
                
            ]
        }
    }
}
</script>