import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/users/Welcome.vue'
import UserList from '@/views/users/UserList.vue'
import AuthorityList from '@/views/authority/AuthorityList.vue'
import RoleList from '@/views/authority/RoleList.vue'
import Goods from '@/views/goods/Goods.vue'
import Lists from '@/views/goods/Lists.vue'
import Add from '@/views/goods/Add.vue'

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
    // 重定向到欢迎页
    redirect: '/home/index',
    children: [
      {
        // 欢迎页
        path: '/home/index',
        component: Welcome
      },
      {
        // 用户列表页
        name: 'User',
        path: '/home/users',
        component: UserList
      },
      {
        // 角色列表
        name: 'AuthorityList',
        path: '/home/rights',
        component: AuthorityList
      },
      {
        // 角色权限
        name: 'RoleList',
        path: '/home/roles',
        component: RoleList
      },
      {
        // 商品管理
        name: 'Goods',
        path: '/home/goods',
        component: Goods,
        redirect: '/home/goods/lists',
        children: [
          {
            // Lists
            name: 'Lists',
            path: 'lists',
            component: Lists
          },
          {
            // Add
            name: 'Add',
            path: 'add',
            component: Add
          }
        ]
      }
    ]
  }
  ]
})

export default router
