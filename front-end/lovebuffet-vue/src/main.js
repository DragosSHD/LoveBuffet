import App from './App.vue';
import router from './router';
import { createApp } from 'vue'

const devBackend = 'http://localhost:8080/';
const herokuBackend = 'https://love-buffet.herokuapp.com/';

const globalVar = {
    data() {
        return {
            backend_url: devBackend
        }
    }
}


const app = createApp(App)
            .use(router);
app.mixin(globalVar);
app.mount('#app');
