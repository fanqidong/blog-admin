import '@/assets/css/reset.css';
import '@/assets/scss/common.scss';
import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import router from './router';
import store from './store';
import config from './config';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

Vue.config.productionTip = false;
Vue.prototype.$config = config;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
