import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import animated  from 'animate.css'
import App from './App'
import store from './store'
import router from './router'
import './permission'

import plugin from './utils/bus';
Vue.use(plugin)
Vue.use(ElementUI, {size: 'mini'})
Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
