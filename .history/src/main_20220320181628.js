import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import axios from 'axios';
const app = createApp(App).use(router);
app.config.productionTip = false;
// axios.defaults.baseURL = 'http://127.0.0.1:8004/';
axios.defaults.baseURL = '/api';
app.use(Antd);
app.mount('#app');
