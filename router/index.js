import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import userlist from '@/views/userlist'
import rightslist from '@/views/rightLists'
import rolerightlist from '@/views/rolerightlist'
import goods from '@/views/goods'
import editgoods from '@/views/goods/editGoods'

Vue.use(Router)

const Drouter = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      // 嵌套路由，layout的嵌套路由
      children: [
        {
          path: '/users',
          name: 'user',
          component: userlist
        },
        {
          path: '/rights',
          name: 'righstlist',
          component: rightslist
        },
        {
          path: '/roles',
          name: 'roleright',
          component: rolerightlist
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods
        },
        {
          path: '/editgoods',
          name: 'editgoods',
          component: editgoods
        }
      ]
    }
  ]
})

Drouter.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.path === '/login') {
    return next()
  }
  if (!token) {
    return next({ path: '/login' })
  }
  next()
})

export default Drouter
