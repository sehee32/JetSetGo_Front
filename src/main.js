import { createApp } from 'vue'
import App from './JetSetGoMain.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import { requestIdentityVerification } from "./identityVerification";
import { requestCertification } from "../public/portOneVerification.html";


// createApp(App).use(router).mount('#app')

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
// requestIdentityVerification();
requestCertification();
