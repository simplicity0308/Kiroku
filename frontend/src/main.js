import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


const app = createApp(App)
app.use(router)

app.use(ToastPlugin, {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    pauseOnHover: true,
});
app.mount('#app')
