<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 10:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\train\index.vue
 -->
<template>
    <div style="margin: 100px 18% 40px 18%;position: relative;" >
                <train-title :title="title" english="Training Center" :ismany="false" ></train-title>      
        <div style="background: #fff;padding: 20px;" >

                            <div v-if="isLoading"  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                    <items :row="item" :index="index" ></items>
                            </div>
                            <div v-else style="min-height: 500px;position: relative;" >
                                <loading></loading>
                            </div>
                            <div v-if="!isNoData&&isLoading" style="min-height: 400px;position: relative;">
                                <no-data></no-data>
                            </div>
                   
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
</template>

<script>
import Items from './Items'
import TrainTitle from '@/components/title'
import { getOrgTrains } from "@/api/train"
import Long from "long"
import Loading from "@/components/loading"
import NoData from '@/components/noData'
export default {
    components:{
        TrainTitle,
        Items,
        Loading,
        NoData
    },
    data(){
        return {
            pageSize:10,
            current:1,
            total:0,
            pageSizes:[8,16,32],
            title:{
                nameLeft:"培训",
                nameRight:"专栏"
            },
            documentList:[],
            isLoading:false,
            isNoData:false,
        }
    },
    methods:{
        // pagesize 变化回调
        handleSizeChange(val){
            this.pageSize = val
            this.handleGetOrgTrains()
        },
       //current 变化回调
        handleCurrentChange(val){
            this.current = val
            this.handleGetOrgTrains()
        },
        handleGetOrgTrains({current=this.current,pageSize=this.pageSize}={}){
            getOrgTrains({current,pageSize}).then(response => {
                this.isLoading = true
                let page = response.page
                this.total = page.total
                if(response && response.value.length>0){
                    this.isNoData = true
                    this.documentList = response.value.map(item =>{
                        item.id = (Long.fromValue(item.id)).toString()
                        return item
                    })
                }
            })
        }
    },
    mounted () {
        this.handleGetOrgTrains()
    }
}
</script>
<style lang="scss" scoped >
.train-col-content {
    text-align: left;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 1px 1px 10px 1px #4c9ace;
    padding: 6px 16px 6px 16px;
    cursor: pointer;
    font-size: 16px;
    transition: all .3s;
    margin: 12px 12px;
}
.train-col-content:hover {
   transform: scale(1.1)
}
</style>