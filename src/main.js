import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from '../router'

import 'element-ui/lib/theme-chalk/index.css'
import '@/css/index.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
