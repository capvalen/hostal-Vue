import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app= createApp(App);

app.config.globalProperties.nombreApi ='http://localhost/hostal/apiHostal';

app.use(router).mount('#app')
