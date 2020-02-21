<template>
    <div v-if="!item.hidden"  >
           
        <template v-if="hasOneShowingChild(item.children,item)&& (!onlyOneChild.children||onlyOneChild.noShowingChildren)" >
            <!----最后一个菜单----->
            <el-menu-item :index="resolvePath(onlyOneChild.path)" >
             <item :title="onlyOneChild.meta.title" ></item>
            </el-menu-item>
        </template>
            <!------有子菜单------->
            <el-submenu  v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body >
                <template slot="title">
                        <item v-if="item.meta"  :title="item.meta.title" />
                </template>
                <nav-menu  v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-path="resolvePath(child.path)"
                ></nav-menu>
            </el-submenu>
       
    </div>
</template>
<script>
import Item from './Item'
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
    name:'NavMenu',
    data(){
        this.onlyOneChild = null
        return {
        }
    },
    props:{
        basePath: {
         type: String,
         default: ''
        },
        item: {
        type: Object,
        required: true
       },
    },
    components:{
        Item
    },
    methods:{
        hasOneShowingChild(children = [], parent) {
            
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
         
          this.onlyOneChild = item
          return true
        }
      })

    
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
        resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
    }
}
</script>