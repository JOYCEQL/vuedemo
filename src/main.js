/*
 * @Author: yuguangzhou
 * @Date: 2021-01-23 14:32:01
 * @LastEditTime: 2022-01-13 10:21:34
 * @LastEditors: yuguangzhou
 * @Description:
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../theme/index.css'
import VCalendar from 'v-calendar'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import echarts from 'echarts'
import Print from 'vue-print-nb'
// import 'v-calendar/src/styles/tailwind-lib.css'
Vue.prototype.$echarts = echarts
Vue.use(VXETable)
Vue.use(VCalendar, {
  componentPrefix: 'v'
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Antd)
Vue.use(Print)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
