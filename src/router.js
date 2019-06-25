import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin/category'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Admin" */ './views/Admin.vue'),
      children: [
        {
          path: 'article',
          name: 'Article',
          component: () => import(/* webpackChunkName: "Article" */ './views/management/Article.vue')
        },
        {
          path: 'newArticle',
          name: 'NewArticle',
          component: () => import(/* webpackChunkName: "PostArticle" */ './views/management/NewArticle.vue')
        },
        {
          path: 'picture',
          name: 'Picture',
          component: () => import(/* webpackChunkName: "Picture" */ './views/management/Picture.vue')
        },
        {
          path: 'notice',
          name: 'Notice',
          component: () => import(/* webpackChunkName: "Notice" */ './views/management/Notice.vue')
        },
        {
          path: 'mood',
          name: 'Mood',
          component: () => import(/* webpackChunkName: "Mood" */ './views/management/Mood.vue')
        },
        {
          path: 'newTag',
          name: 'NewTag',
          component: () => import(/* webpackChunkName: "NewTag" */ './views/management/NewTag.vue')
        },
        {
          path: 'tag',
          name: 'Tag',
          component: () => import(/* webpackChunkName: "Tag" */ './views/management/Tag.vue')
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import(/* webpackChunkName: "Category" */ './views/management/Category.vue')
        }
      ]
    }
  ]
});
