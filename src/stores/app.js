import { defineStore } from 'pinia';
import axios from "axios";
import { useNotificationStore } from '@/stores/notification.js';
import { useRouter } from 'vue-router';

export const useAppStore = defineStore('app', {
  state: () => ({
    base_url: import.meta.env.VITE_API_BASE_URL,
    isAuthenticated: false,
    token: sessionStorage.getItem("token") || null,
    user_id: sessionStorage.getItem("user_id") || null,
  }),
  actions: {
    async loginUser({ username, password }) {
      try {
        const response = await axios.post(this.base_url + '/api/api-token-auth/', {
          username,
          password,
        });

        this.token = response.data.token;
        this.user_id = response.data.user_id;
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("user_id", this.user_id);
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({ type: 'error', message: error.response?.data });
      }
    },

    async getData(endpoint, needsToken = true) {
      try {
        const config = {};
        if (needsToken) {
          config.headers = {
            Authorization: 'Token ' + this.token,
          };
        }

        return await axios.get(this.base_url + endpoint, config);
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({ type: 'error', message: error.response?.data });
        if (error.response.status === 401) {
          window.location = '/login';
        }
      }
    },

    async postData(endpoint, data, needsToken = true) {
      try {
        const config = {};
        if (needsToken) {
          config.headers = {
            Authorization: 'Token ' + this.token,
          };
        }
        const response = await axios.post(this.base_url + endpoint, data, config);

        return response.data;
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({ type: 'error', message: error.response?.data });
      }
    },

    async patchData(endpoint, data) {
      try {
        const response = await axios.patch(this.base_url + endpoint, data, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        });

        return response.data;
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({ type: 'error', message: error.response?.data });
      }
    },
  },
});


