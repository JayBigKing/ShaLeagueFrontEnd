// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuebar from 'vuebar'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/index.less'
import '@/assets/styles/element-ui.less'
import App from './App'
import '@/assets/iconfont-default'
import router from './router/'
import store from './store/'

import VueRouter from 'vue-router'
import Routers from './router/routes'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(Vuebar)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ViewUI)
const RouterConfig = {
  routes: Routers
}
const router2 = new VueRouter(RouterConfig)

var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:7899'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#app',
  router: router2,
  render: h => h(App)
})
