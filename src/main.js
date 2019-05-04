import './assets/js/evanyou.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import  {Message} from 'iview'
import './assets/css/reset.css'
import'./assets/scss/common.scss'

Vue.config.productionTip = false
Vue.prototype.$Message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
