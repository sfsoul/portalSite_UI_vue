<template>
    <div  class="search" >
        <search-menu></search-menu>
        <div class="search-content">
            <news-title titlea="搜索" titleb="结果" english="Search Result" :ismany="false" ></news-title>
           <item></item> 

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
import SearchMenu from './search-menu'
import Item from './Item'
import NewsTitle from '../news/news-title'
export default {
    data(){
        return {
            pageSize:10,
            current:1,
            total:120,
            pageSizes:[8,16,32],
        }
    },
    components:{
        SearchMenu,
        Item,
        NewsTitle
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

<style scoped lang="scss">

.search {
    position: relative;
    min-width: 1200px;

    .search-content {
        margin: 100px 18% 20px 18%;
        position: relative;
    }
}

</style>