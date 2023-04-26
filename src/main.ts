import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import VueCookies from 'vue3-cookies'
import store from './store/store'

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"


const app = createApp(App)

app.use(router).use(VueCookies).use(store)
app.mount('#app')
