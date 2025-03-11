<script setup>
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notification.js';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
</script>

<template>
	<div v-if="notifications.length" class="fixed top-5 right-5 z-[4]">
		<v-alert
			v-for="notification in notifications"
			:key="notification.id"
			:type="notification.type"
			class="fade-alert"
			closable 
		>
		<span v-for="notification in notifications" :key="notification.id">
			{{ 
				notification.message?.message
					? notification.message?.message 
					: notification.message?.detail
						?  notification.message?.detail
						:  notification.message ?? 'Произошла ошибка. Обновите страницу!' 
			}}
		</span>
		</v-alert>
</div>
</template>

<style scoped>
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.fade-alert {
  animation: fadeInOut 4s ease-in-out forwards;
}
</style> 