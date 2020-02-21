<template>
    <div style="display: flex;justify-content: space-between;flex-wrap: nowrap;margin: 20px 0px;font-size: 14px;cursor: pointer;color: #535151;width: 100%;" >
            
        
        <router-link :to="{name:'quality-details'}" style="text-decoration: none;color: #535151;width: 80%;" >
                <div style="width: 80%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis" >
                        <span>{{title}}</span>
                </div>
        </router-link>
        <div>
            <span>{{date}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'Item',
    props:{
        title:{
            type:String,
            default:''
        },
        date:{
            type:String,
            default:''
        }
    }
}
</script>