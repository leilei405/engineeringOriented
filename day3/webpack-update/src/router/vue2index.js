import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home/index.vue'
import Login from '../Login/index.vue'

Vue.use(Router)

// 导出路由配置
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
