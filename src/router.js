import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "Admin" */ './views/Admin.vue')
    }
  ]
})