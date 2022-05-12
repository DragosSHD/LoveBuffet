import App from './App.vue';
import router from './router';
import { createApp } from 'vue'

const globalVar = {
    data() {
        return {
            backend_url: 'http://localhost:8080/'
        }
    }
}

const app = createApp(App)
            .use(router);
app.mixin(globalVar);
app.mount('#app');
