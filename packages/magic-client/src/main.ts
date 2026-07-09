import '@mdi/font/css/materialdesignicons.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

import { createApp } from 'vue';

import App from './App.vue';
import './main.css';
import router from './router';

const app = createApp(App)
  .use(PrimeVue, { theme: 'none' })
  .use(ToastService)
  .use(router);

app.directive('tooltip', Tooltip);

app.mount('#app');
