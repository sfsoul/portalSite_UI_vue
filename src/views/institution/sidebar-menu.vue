<template>
    <div style=" position: relative;width:300px;" >
        <dl class="list nigiri" style="transform: perspective(1200px)" >
            <dt>部门名称</dt>
            <span><dd @click="getRegulations" >全部</dd></span>
            <span v-for="(item,index) in departMents" :key="index"><dd @click="handleDeptSearch(item.dptid)">{{item.dptname}}</dd></span>
        </dl>
    </div>
</template>

<script  >
import { getDepartMents } from "@/api/institution"
export default {
    data(){
        return {
            departMents:[]
        }
    },
    methods: {
        handleGetDepartMents(){
            getDepartMents().then(response => {
                this.departMents = response
            })
        },
        handleDeptSearch(deptid){
            this.getRegulations({deptid:deptid})
        }
    },
    mounted () {
        this.handleGetDepartMents()
    },
    props:{
        getRegulations:{
            type:Function,
        }
    }
}
</script>

<style scoped>

.list {
    transform-style: preserve-3d;
    text-transform: uppercase;
    position: absolute;
   
    width: 100%;
    text-align: center;
    left: 0%;

}
.nigiri {
    transform: perspective(1200px) rotateY(40deg) !important;
    transform-origin: 110% 25%;
}
.list dt, .list dd {
    text-indent: 10px;
    line-height: 35px;
    margin: 0;
    height: 35px;
    width: 200px;
    color: #fff;
    cursor: pointer;
   /*  border-bottom: 1px dashed #fff; */
    border:1px ridge #fdfdfc;
    transition: all 0.5s;
}
.list dd:hover {
    margin-left: 30px;
    border-radius: 18px;
    background:#f0831e;
    margin-top: 6px;
    margin-bottom: 6px;
}
.list dt {
    transform: translateZ(0.3px);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
    font-size: 15px;
}
.nigiri dt, .nigiri dd{
    background: #1886d1;
}

</style>