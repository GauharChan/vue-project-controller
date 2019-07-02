import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/users/Welcome.vue'
import UserList from '@/views/users/UserList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: 'Home'
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: '/home/index',
    children: [{
      path: '/home/index',
      component: Welcome
    },
    {
      name: 'User',
      path: '/home/userList',
      component: UserList
    }
    ]
  }
  ]
})

export default router
