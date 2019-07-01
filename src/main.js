import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router'
import '@/styles/index.less'

Vue.use(Element, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
