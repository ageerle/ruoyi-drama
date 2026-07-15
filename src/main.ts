import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './locales';
import router from './routers';
import store from './stores';
import './styles/index.scss';
import 'element-plus/dist/index.css';

const app = createApp(App);

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component);
}

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.mount('#app');
