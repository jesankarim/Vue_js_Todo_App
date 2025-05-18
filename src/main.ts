import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const app = createApp(App);


app.use(Vue3Toastify, {
  autoClose: 10000, 
  position: 'top-right',
} as ToastContainerOptions);

app.use(router); 
app.mount('#app');
