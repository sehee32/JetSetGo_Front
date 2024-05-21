import { createApp } from 'vue'
import App from './JetSetGoMain.vue'
import router from './router'
// import VueMaterialKit from './theme/vue-material-kit-master/src/material-kit.js';
// import './theme/vue-material-kit-master/src/assets/scss/material-kit.scss';


// createApp(App).use(router).mount('#app')

const app = createApp(App);
// app.use(VueMaterialKit);
app.use(router);
app.mount('#app');