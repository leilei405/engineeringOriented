import Vue from 'vue'
import Home from '../Home/index.vue'

const app = new Vue({
  render: h => h(Home)
})
app.$mount('#app')