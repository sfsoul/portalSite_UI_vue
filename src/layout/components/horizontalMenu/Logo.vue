<template>
        <div class="horizontal-logo-container" >
            <router-link v-if="collapse" key="collapse" to="/" >
                <img v-if="logo" src="../../../assets/images/logo.png" class="horizontal-logo" >
                <h1 v-else class="horizontal-title" >{{title}}</h1>
            </router-link>
        </div>
    </template>
    
    <script>
    export default {
        data(){
            return{
                title:'中亚通茂',
                logo: '../../../assets/images/logo.png'
            }
        },
        props:{
            collapse:{
                type:Boolean,
                default:true
            }
        }
    }
    </script>
    
    <style scoped>
    .horizontal-logo-container {
        position: absolute;
        width:140px;
        height: 40px;
        line-height: 40px;
        z-index: 1;
        left: calc(18%) ;
        top: 10px;
    }

    @media screen and (min-width:1980px) {
        .horizontal-logo-container {
        position: absolute;
        width:140px;
        height: 40px;
        line-height: 40px;
        z-index: 1;
        left: calc(0%) ;
        top: 10px;
        }
     }

    .horizontal-logo {
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .horizontal-title{
    
    }
    </style>