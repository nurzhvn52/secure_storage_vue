<script setup>
import { useAppStore } from '@/stores/app';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const userData = reactive({
	username: null,
	password: null
});

const visible = ref(false);
const appStore = useAppStore();
const router = useRouter();

const loginUser = async () => {
	const response = await appStore.loginUser(userData);
	if (response) router.push({ name: 'Storage' });
};
</script>

<template>
    <section class="flex w-full max-w-[1200px] rounded-[8px] m-8 justify-center">
		<div class="text-[#373F46] py-8 px-14 rounded-[8px] shadow-xl">
			<h2 class="text-[36px] text-center font-bold mb-10">
				Войти в систему
			</h2>

			<div>
				<v-label class="text-[#2E3D58] opacity-100 mb-2">
					E-mail
				</v-label>
				<v-text-field 
					v-model="userData.username" 
					variant="outlined"
					class="filled-field mb-4"
					hide-details
					rounded="md"
					density="compact"
				/>

				<v-label class="text-[#2E3D58] opacity-100 mb-2">
					Пароль
				</v-label>
				<v-text-field 
					v-model="userData.password" 
					:append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
					:type="visible ? 'text' : 'password'"
					variant="outlined"
					class="filled-field"
					hide-details
					rounded="md"
					density="compact"
					@click:append-inner="visible = !visible"
				/>

				<div class="flex justify-end mt-8">
					<v-btn 
						width="108"
						color="#0670DA" 
						flat 
						text="Войти"
						class="text-none h-10"
						rounded="lg"
						@click="loginUser"
					/>
				</div>
			</div>
			<div class="mt-7 mb-2">
				Если у Вас нет учетной записи, создайте её.
			</div>
			<router-link to="/registration" class="text-xl underline">
				Регистрация
			</router-link>
		</div>
	</section>
</template>