<template>
        <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
                <quality-title :title="title" english="Quality Information" :ismany="false" ></quality-title>
            <quality-item></quality-item>
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
    </template>
    
    <script>
    import {QualityItem} from '../quality'
    import QualityTitle from '@/components/title'
    export default {
        components:{
            QualityTitle,
            QualityItem
        },
        data(){
            return{
                pageSize:10,
                current:1,
                total:120,
                pageSizes:[10,20,30,40],
                title:{
                    nameLeft:"质量",
                    nameRight:"信息"
                }
            }
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