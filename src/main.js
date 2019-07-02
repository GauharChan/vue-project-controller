import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'
import '@/styles/index.less'

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let userLogin = localStorage.getItem('userLogin')
  if (userLogin || to.path === '/login') {
    next()
  } else if (!userLogin && to.path !== '/login') {
    next({
      name: 'Login'
    })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
