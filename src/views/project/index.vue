<template>
    <div>
               
        <div style="margin: 60px 18% 40px 18%" >
            <!--头部标题-->
                <project-title :title="title" english="Project Plan" :ismany="false" ></project-title>
               <!--头部搜索-->
                <div  class="filter-container" >
                        <el-select v-model="filtrateQuery.branch" placeholder="部门名称" clearable style="width: 130px" class="filter-item">
                             <el-option v-for="item in branchOptions" :key="item" :label="item" :value="item" />
                        </el-select>
                        <el-select v-model="filtrateQuery.status" placeholder="执行状态" clearable class="filter-item" style="width: 130px">
                            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
                        </el-select>
                        <el-input v-model="filtrateQuery.projectName" placeholder="项目名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        <el-date-picker  class="filter-item"
                           v-model="filtrateQuery.startDate"
                           type="daterange"
                           align="right"
                           unlink-panels
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           :picker-options="pickerOptions">

                        </el-date-picker>
                        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                                搜索
                        </el-button>
                </div>
                <el-table 
                   :key="tableKey"
                   v-loading="listLoading"
                   :data="projectList"
                   border
                   fit
                   highlight-current-row
                   style="width: 100%;"  >
                   <el-table-column label="序号" type="index" width="50" align="center" >
                    </el-table-column>

                   <el-table-column label="项目名称" prop="projectName" align="center" >
                       <template slot-scope="scope" >
                           <span style="cursor: pointer;" >{{scope.row.projectName}}</span>
                       </template>
                   </el-table-column>
                   

                </el-table>
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
/* import Item from './Item' */
import ProjectTitle from '@/components/title'
export default {
    components:{
    /*     Item, */
       ProjectTitle
    },
    data(){
        return {
            pageSize:10,
            current:1,
            total:120,
            pageSizes:[8,16,32],
            listLoading:false,
            title:{
                nameLeft:"项目",
                nameRight:"进度"
            },
            branchOptions:[ //部门集合
            "软件部","系统部","技术服务中心","总经办"
            ],
            statusOptions:[ //状态情况
            "已完成","未完成"
            ],
            filtrateQuery:{
                branch:null,
                status:null,
                projectName:null,
                startDate:null,
                endDate:null,
            },
            projectList:[
                {
                    projectName:"oa项目合同管理系统"
                },
                {
                    projectName:"oa项目合同管理系统"
                },
                {
                    projectName:"oa项目合同管理系统"
                },
                {
                    projectName:"oa项目合同管理系统"
                },
                {
                    projectName:"oa项目合同管理系统"
                }
            ],
            tableKey:0,
            pickerOptions:{ // 时间配置
                shortcuts:[
                    {
                        text:"最近一周",
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 *7);
                            picker.$emit('pick',[start,end])
                        }
                    },
                    {
                        text:"最近一个月",
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 *30);
                            picker.$emit('pick',[start,end])
                        }
                    },
                    {
                        text:"最近三个月",
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 *90);
                            picker.$emit('pick',[start,end])
                        }
                    }
                ]
            }
        }
    },
    methods:{
        // pagesize 变化回调
        handleSizeChange(val){

        },
       //current 变化回调
        handleCurrentChange(val){

        },
       //搜索项目名称框
        handleFilter(){

       }
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
.filter-container {
    margin-bottom: 10px;
}

</style>