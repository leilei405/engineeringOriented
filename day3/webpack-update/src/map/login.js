import Vue from 'vue'
import Login from '../Login/index.vue'

const app = new Vue({
  render: h => h(Login)
})

app.$mount('#app')