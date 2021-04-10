import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant'
import http from './network'

Vue.use(Vant)
Vue.use(Toast)

Vue.prototype.$http = http
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
