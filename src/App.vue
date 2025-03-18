<script setup>
import Notification from "@/components/Notification.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
	<Notification />
	<v-layout class="flex items-start w-full min-h-screen h-full">
		<Sidebar v-if="!$route.meta.public" />

		<div class="w-full">
			<Navbar v-if="!$route.meta.public" />

			<v-main :class="[{ 'pl-[100px]': !$route.meta.public }, 'pr-10 py-5']">
				<router-view />
			</v-main>
		</div>
	</v-layout>
</template>

