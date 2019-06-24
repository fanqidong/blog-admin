import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/admin/mood'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "Admin" */ './views/Admin.vue'),
      children:[
        {
          path: 'article',
          name: 'article',
          component: () => import( /* webpackChunkName: "Article" */ './views/management/Article.vue'),
        },
        {
          path: 'postArticle',
          name: 'postArticle',
          component: () => import( /* webpackChunkName: "PostArticle" */ './views/management/PostArticle.vue'),
        },
        {
          path: 'picture',
          name: 'picture',
          component: () => import( /* webpackChunkName: "Picture" */ './views/management/Picture.vue'),
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import( /* webpackChunkName: "Notice" */ './views/management/Notice.vue'),
        },
        {
          path: 'mood',
          name: 'mood',
          component: () => import( /* webpackChunkName: "Mood" */ './views/management/Mood.vue'),
        }
      ]
    }
  ]
})