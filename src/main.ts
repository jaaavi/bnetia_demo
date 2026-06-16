import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import './style.css';

const vuetify = createVuetify();

createApp(App).use(vuetify).mount('#app');
