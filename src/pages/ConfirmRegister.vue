<script setup>
import { useAppStore } from '@/stores/app';
import { useNotificationStore } from '@/stores/notification';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const notificationStore = useNotificationStore();

onMounted(async () => {
    const response = await appStore.getData('/api/secure-storage/user/confirm/' + route.params.uidb64 + '/' + route.params.token + '/', false);
    if (response) {
        notificationStore.showNotification({ type: 'success', message: response.data.message });
        router.push({ name: 'Login' });
    }
});
</script>

<template></template>