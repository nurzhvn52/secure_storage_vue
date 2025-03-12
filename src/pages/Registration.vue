<script setup>
import { useAppStore } from '@/stores/app';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const userData = reactive({
    email: null,
    first_name: null,
    last_name: null,
	username: null,
	password: null,
    password_confirm: null,
});

const visible = ref(false);
const confirmVisible = ref(false);
const appStore = useAppStore();
const router = useRouter();

const registerUser = async () => {
	const response = await appStore.postData('/api/secure-storage/user/', { user: userData }, false);
	if (response) router.push({ name: 'Login' });
};
</script>

<template>
    <section class="flex w-full max-w-[1200px] rounded-[8px] m-8 justify-center">
		<div class="text-[#373F46] py-8 px-14 rounded-[8px] shadow-xl">
			<h2 class="text-[36px] text-center font-bold mb-10">
				Регистрация
			</h2>

			<div class="w-[400px]">
				<v-label class="text-[#2E3D58] opacity-100 mb-2">
					E-mail
				</v-label>
				<v-text-field 
					v-model="userData.email" 
					variant="outlined"
					class="mb-4"
					hide-details
					rounded="md"
					density="compact"
                    type="email"
				/>

                <v-label class="text-[#2E3D58] opacity-100 mb-2">
					Username
				</v-label>
				<v-text-field 
					v-model="userData.username" 
					variant="outlined"
					class="mb-4"
					hide-details
					rounded="md"
					density="compact"
                    type="email"
				/>

                <v-label class="text-[#2E3D58] opacity-100 mb-2">
					Фамилия
				</v-label>
				<v-text-field 
					v-model="userData.last_name" 
					variant="outlined"
					class="mb-4"
					hide-details
					rounded="md"
					density="compact"
                    type="email"
				/>

                <v-label class="text-[#2E3D58] opacity-100 mb-2">
					Имя
				</v-label>
				<v-text-field 
					v-model="userData.first_name" 
					variant="outlined"
					class="mb-4"
					hide-details
					rounded="md"
					density="compact"
                    type="email"
				/>

				<v-label class="text-[#2E3D58] opacity-100 mb-2">
					Пароль
				</v-label>
				<v-text-field 
					v-model="userData.password" 
					:append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
					:type="visible ? 'text' : 'password'"
					variant="outlined"
					class="mb-4"
					hide-details
					rounded="md"
					density="compact"
					@click:append-inner="visible = !visible"
				/>

                <v-label class="text-[#2E3D58] opacity-100 mb-2">
					Повторите пароль
				</v-label>
				<v-text-field 
					v-model="userData.password_confirm" 
					:append-inner-icon="confirmVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
					:type="confirmVisible ? 'text' : 'password'"
					variant="outlined"
					hide-details
					rounded="md"
					density="compact"
					@click:append-inner="confirmVisible = !confirmVisible"
				/>

				<div class="flex justify-between mt-8">
                    <v-btn 
						width="228"
						color="#E1E1E3" 
						flat 
						text="Авторизация"
						class="text-none h-10"
						rounded="lg"
                        @click="router.push({ name: 'Login' })"
					/>
					<v-btn 
						width="120"
						color="#0670DA" 
						flat 
						text="Сохранить"
						class="text-none h-10"
						rounded="lg"
                        @click="registerUser"
					/>
				</div>
			</div>
		</div>
	</section>
</template>