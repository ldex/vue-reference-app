import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Global error handler
app.config.errorHandler = (error) => {
    console.error('Global error: ', error.message);
    router.push({ name: 'error'});
}
