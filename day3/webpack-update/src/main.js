import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './css/public.css'

createApp(App).use(router).mount('#app')
