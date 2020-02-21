<template>
        <div>
            <dl class="list nigiri" style="transform: perspective(1200px);font-size: 14px;font-weight: 600;" >
                <dt>信息类别</dt>
                <span><dd>全部</dd></span>
                <span><dd>新闻动态</dd></span>
                <span><dd>通知公告</dd></span>
                <span><dd>质量信息</dd></span>
                <span><dd>荣誉中亚</dd></span>
                <span><dd>培训专栏</dd></span>
                <span><dd>制度文档</dd></span>
                <span><dd>项目进度</dd></span>
                <span><dd>知识共享</dd></span>
            </dl>
        </div>
    </template>
    
    <script  >
    
    </script>
    
    <style scoped >
    
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