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
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
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
      permission_routes: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
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
      this.permission_routes = []
      this.$router.options.routes.filter(route => {
        if (route.path === '/') {
          this.permission_routes.unshift(route)
        }
        if (route.hidden) {
          this.permission_routes.push(route)
        }
        if (!route.hidden && route.path !== '/') {
          getUserEnableRootMenu().then(res => {
            res.forEach(serverParent => {
              if (serverParent.modulename === route.name) {
                this.permission_routes.push({
                  id: serverParent.id,
                  path: route.path,
                  component: route.component,
                  redirect: route.redirect,
                  name: route.name,
                  meta: route.meta,
                  children: []
                })
              }
              getUserEnableChildrenMenuByPid(serverParent.id).then(resp => {
                resp.forEach(serverchild => {
                  this.permission_routes.forEach(item2 => {
                    if (serverchild.parent === item2.id) {
                      route.children.filter(childRoute => {
                        if (childRoute.meta.title === serverchild.modulename) {
                          item2.children.push({
                            path: childRoute.path,
                            component: childRoute.component,
                            name: childRoute.name,
                            meta: childRoute.meta
                          })
                        }
                      })
                    }
                  })
                })
              })
            })
          })
        }
      })
    }
  }
}
</script>
