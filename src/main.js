import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/util'
import '@/assets/verifier.css'
import '@/assets/global.css'
import '@/assets/global.js'
import { formatDate } from '@/assets/util'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  filters: {
    simpleDateFormat (timestamp, pattern) {
      return formatDate(timestamp, pattern)
    }
  },
  render: h => h(App)
}).$mount('#app')
