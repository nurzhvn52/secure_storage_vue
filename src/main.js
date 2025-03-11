import App from './App.vue'
import router from './router/index';
import "@/styles/style.scss";

import { createApp } from 'vue'
import { createPinia } from 'pinia';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
	components: {
		VDateInput,
	},
	directives,
	icons: {
		defaultSet: 'mdi',
	},
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(vuetify);
app.mount('#app');
