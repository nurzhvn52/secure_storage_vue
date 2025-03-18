import App from './App.vue'
import router from './router/index';
import "@/styles/style.scss";

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

// Localization
const savedLanguage = sessionStorage.getItem('lang') || 'ru';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import kk from '@/locales/kk.json';

const messages = {
	en,
	ru,
	kk,
};

const i18n = createI18n({
	legacy: false,
	locale: savedLanguage,
	fallbackLocale: 'ru',
	messages,
});

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as directives from 'vuetify/directives';
import { ru as vuetifyRu, en as vuetifyEn } from 'vuetify/locale';  // локализация для Vuetify

const vuetify = createVuetify({
	components: {
		VDateInput,
	},
	directives,
	icons: {
		defaultSet: 'mdi',
	},
	locale: {
		locale: savedLanguage == 'en' ? 'en' : 'ru',
		fallback: 'en', // язык по умолчанию, если не найден ключ
		messages: {
			ru: vuetifyRu,
			en: vuetifyEn,
			kk: vuetifyRu
		},
	},
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(vuetify).use(i18n);
app.mount('#app');
