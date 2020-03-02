<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="$store.state.settings.uniqueOpened"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { getUserEnableRootMenu, getUserEnableChildrenMenuByPid } from '@/api/sidebar/sidebar'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      rootMenu: [],
      children: [],
      listQuery: {
        current: 0,
        pageSize: 10
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    routes() {
      let permissionRoute = []
      this.$router.options.routes.filter(route => {
        if (!route.hidden && route.path !== '/') {
          for (let j = 0; j < this.rootMenu.length; j++) {
            if (this.rootMenu[j].modulename === route.meta.title) {
              permissionRoute.push(route)
            }
          }
          permissionRoute = permissionRoute.map(item => {
            item.children = item.children.filter(child => {
              return this.children.every(item2 => {
                if (child.meta.title === item2) {
                  return true
                }
                return false
              })
            })
            return item
          })
        }
        if (route.path === '/') {
          permissionRoute.unshift(route)
        }
      })
      console.log('permissionRoute', permissionRoute)
      return permissionRoute
      // return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.getUserEnableRootMenu()
  },
  methods: {
    getUserEnableRootMenu() {
      const _this = this
      getUserEnableRootMenu(this.listQuery).then(res => {
        this.rootMenu = res
        getChildList(0, res.length)
        function getChildList(j, length) {
          getUserEnableChildrenMenuByPid(res[j].id).then(resp => {
            resp.forEach(item => {
              _this.children.push(item.modulename)
            })
            if (++j < length) {
              getChildList(j, length)
            }
          })
        }
      })
      console.log(this.children)
    }
  }
}
</script>
