<script setup>
import Notification from "@/components/Notification.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>
<template>
    <Notification />
    <v-layout class="flex flex-col w-full h-screen overflow-hidden bg-[#f9f9f9]">
        <Navbar v-if="!$route.meta.public" class="sticky top-0 z-20 bg-white" />
        <div class="flex flex-1 bg-[#F9F9F9] overflow-hidden">
            <Sidebar v-if="!$route.meta.public" class=""/>
            <div class="w-full overflow-hidden">
                <v-main :class="[{ 'pl-[100px]': !$route.meta.public }, 'overflow-y-auto ']">
                    <router-view />
                </v-main>
            </div>
        </div>
    </v-layout>
</template>
