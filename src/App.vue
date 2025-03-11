<script setup>
import Notification from "@/components/Notification.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
	<Notification />
	<v-layout class="flex items-start w-full min-h-screen">
		<Sidebar />

		<div class="w-full">
			<Navbar />

			<v-main class="pl-[100px] pr-10 py-5">
				<router-view />
			</v-main>
		</div>
	</v-layout>
</template>

