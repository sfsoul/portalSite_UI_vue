<template>
    <div >
        <el-carousel  height="500px" >
            <el-carousel-item v-for="item in 4" :key="item">
             
            </el-carousel-item>
        </el-carousel>
        <div style="margin: 18px 18%;background-color: #fff;padding: 20px;" >
            <news-title titlea="新闻" titleb="动态" english="New Information" :ismany="false" ></news-title>
            <div>
                <item v-for="(news,index) in newsData" :row="news" :index="index" :key="index"   ></item>
                <el-pagination
                   background 
                  :page-size="pageSize"
                  :total="total"
                  :current-page="current"
                  layout="total,sizes,prev,pager,next,jumper"
                  :page-sizes="pageSizes"
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>
<script>
import Item from './Item'
import NewsTitle from './news-title'
import Breadcrumd from '@/components/breadcrumd.vue'
    export default {
        data(){
            return{
                pageSize:10,
                current:1,
                total:120,
                pageSizes:[10,20,30,40],
                newsData:[
                {
                    date:'2019/12/19',
                    title:'最终终于你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/10/11',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/9/12',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },{
                    date:'2019/12/19',
                    title:'我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从'
                },
                {
                    date:'2019/9/12',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },{
                    date:'2019/12/19',
                    title:'我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从'
                },
                {
                    date:'2019/9/12',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },{
                    date:'2019/12/19',
                    title:'我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过'
                },
                {
                    date:'2019/12/19',
                    title:'最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从'
                }
            ]
            }
        },
        mounted(){
            console.log(this.$route)
        },
        components:{
            NewsTitle,
            Item,
            Breadcrumd
        },
        props:{
                id: {default:1}
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){

            },
            //current 变化回调
            handleCurrentChange(val){

            }
        }
    }
</script>
<style>
    .el-carousel__item:nth-child(2n){
        background-image: url('../../assets/images/beijing.png')
        }
    .el-carousel__item:nth-child(2n+1){
            background-image: url('../../assets/images/banner.png')
        }
</style>