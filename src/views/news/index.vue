<template>
    <div style="margin-top: 40px" >
        
        <news-title titlea="新闻" titleb="动态" english="New Information" ></news-title>
        <el-row :gutter="20" type="flex" justify="space-btween" >
            <el-col :span="12"  style="max-height: 400px;" >
                   <news-details :activeInfo="activeInfo" ></news-details>
            </el-col>
            <el-col :span="12" style="max-height: 400px;" >
                    <news-item @imageToDetails="receptiomImageInfo" :newsData="newsData" ></news-item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import NewsItem from './news-Item'
import NewsDetails from './news-details'
import NewsTitle from './news-title'

export default {
    data(){
        return {
            activeInfo:null,
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
                    title:'最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道，最终终于从你全世界路过,你明知道，我知道你知道',
                    content:'最终终于从'
                }
            ]
        }
    },
    components:{
        NewsItem,
        NewsDetails,
        NewsTitle,
    },
    props:{

    },
    methods:{
        receptiomImageInfo(e){
            this.activeInfo = e
        }
    }
}
</script>
<style>

</style>