<template>
    <div class="search-item" v-if="searchInfo" >
        <div class="search-cla" >
            <span>{{searchInfo.articletypeStr}}</span>
        </div>
        <div class="search-title">
            <span>{{searchInfo.title}}</span>
        </div>
        
        <div class="search-content">
            <router-link :to="{path:'/'}" style="text-decoration: none;color: #222;" >
                    <span>{{searchInfo.summary}}</span>
            </router-link>
            
        </div>
        <div class="search-item-date" >
            <span>{{searchInfo.publishdate}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        searchInfo:{
            type:Object,
            default:null
        }
    }

}
</script>

<style scoped lang="scss" >

.search-item {
    position: relative;
    background: #fff;
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 20px;

    .search-cla {
        position: absolute;
        font-size: 14px;
        font-weight: 600;
        background: #1886d1;
        padding: 4px;
        color: #fff;
        border-radius: 6px;
    }

    .search-title {
        position: absolute;
        left: 60px;
        width: 80%;
        text-align: center;
        font-weight: 700;
    }

    .search-content {
        position: absolute;
        top: 50%;
        left: 10%;
        width: 80%;
        text-indent: 2rem;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .search-item-date {
        position: absolute;
        bottom:2% ;
        right: 10px;
        font-size: 14px;
        color: #888
    }
}
</style>

