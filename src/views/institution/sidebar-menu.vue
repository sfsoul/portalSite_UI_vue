<template>
    <div   >
        <dl class="list nigiri" style="transform: perspective(1200px)" >
            <dt>部门名称</dt>
            <span><dd>软件部</dd></span>
            <span><dd>产品导入部</dd></span>
            <span><dd>技术服务中心</dd></span>
            <span><dd>项目管理部</dd></span>
            <span><dd>财务部</dd></span>
            <span><dd>总经办</dd></span>
            <span><dd>采购部</dd></span>
            <span><dd>市场部</dd></span>
            <span><dd>质量部</dd></span>
            <span><dd>生产总部</dd></span>
        </dl>
    </div>
</template>

<script  >

</script>

<style scoped>

.list {
    transform-style: preserve-3d;
    text-transform: uppercase;
    position: absolute;
    width: 300px;
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