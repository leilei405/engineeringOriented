import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './css/public.css'

const app = new Vue({
  router,
  render: h => h(App)
})
app.$mount('#app')