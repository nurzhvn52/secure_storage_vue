<script setup>
import { useAppStore } from '@/stores/app';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ShieldCheckIcon, LockClosedIcon, KeyIcon, ServerIcon, UserPlusIcon } from '@heroicons/vue/24/outline';

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

// Animation configurations for right side subtle background
const animateLoginBackground = () => {
  const loginShapes = document.querySelectorAll('.login-shape');
  
  loginShapes.forEach(shape => {
    // Slower, more subtle animations for login side
    const duration = 25 + Math.random() * 20;
    const delay = Math.random() * 8;
    
    shape.style.animation = `floatSubtle ${duration}s ease-in-out ${delay}s infinite`;
    
    // Set random initial positions
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.left = `${Math.random() * 100}%`;
  });
};

onMounted(() => {
  animateLoginBackground();
});
</script>

<template>
  <section class="min-h-screen w-full flex items-center justify-center p-8 relative bg-gradient-to-br from-gray-50 to-sky-50 overflow-hidden">
    <!-- Background design elements -->
    <div class="login-shape login-circle-1"></div>
    <div class="login-shape login-circle-2"></div>
    <div class="login-shape login-rectangle-1"></div>
    <div class="login-shape login-rectangle-2"></div>
    <div class="login-shape login-rectangle-3"></div>
    
    <!-- Light glow effect in corners -->
    <div class="absolute w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-20 -top-32 -right-32"></div>
    <div class="absolute w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-10 bottom-20 -left-20"></div>
    
    <!-- Logo/Brand at top -->
    <div class="absolute top-6 left-6 z-20">
      <div class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">secure.storage</div>
    </div>

    <!-- Main content -->  
    <div class="max-w-[500px] bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 z-10">
      <div class="flex items-center justify-center mb-6">
        <div class="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
          <UserPlusIcon class="h-6 w-6 text-white" />
        </div>
        <h2 class="text-3xl font-semibold text-gray-800 ml-3">
          Регистрация
        </h2>
      </div>
      
      <div class="mb-6 text-gray-500 text-center">Создайте аккаунт для безопасного хранения данных</div>
      
      <div class="grid grid-cols-2 gap-4">
        <!-- Left column -->
        <div>
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            E-mail
          </label>
          <v-text-field 
            v-model="userData.email" 
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            type="email"
            placeholder="example@mail.com"
          />
          
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            Username
          </label>
          <v-text-field 
            v-model="userData.username" 
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            placeholder="Ваш логин"
          />
          
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            Пароль
          </label>
          <v-text-field 
            v-model="userData.password" 
            :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="visible ? 'text' : 'password'"
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            placeholder="Введите пароль"
            @click:append-inner="visible = !visible"
          />
        </div>
        
        <!-- Right column -->
        <div>
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            Имя
          </label>
          <v-text-field 
            v-model="userData.first_name" 
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            placeholder="Ваше имя"
          />
          
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            Фамилия
          </label>
          <v-text-field 
            v-model="userData.last_name" 
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            placeholder="Ваша фамилия"
          />
          
          <label class="block text-gray-500 text-sm font-semibold mb-2">
            Повторите пароль
          </label>
          <v-text-field 
            v-model="userData.password_confirm" 
            :append-inner-icon="confirmVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="confirmVisible ? 'text' : 'password'"
            variant="outlined"
            class="filled-field mb-4"
            hide-details
            rounded="md"
            density="compact"
            placeholder="Повторите пароль"
            @click:append-inner="confirmVisible = !confirmVisible"
          />
        </div>
      </div>
      
      <!-- Button group -->
      <div class="flex gap-4 mt-8">
        <v-btn 
          color="#38bdf8" 
          flat 
          text="Сохранить"
          class="text-none h-12 font-medium w-full text-white text-[16px] font-semibold login-button"
          rounded="lg"
          @click="registerUser"
        />
      </div>
      
      <!-- Security badges -->
      <div class="mt-8 flex gap-4 justify-center">
        <div class="security-badge">
          <LockClosedIcon class="h-4 w-4 mr-2" />
          <span>Защищённое соединение</span>
        </div>
        <div class="security-badge">
          <ShieldCheckIcon class="h-4 w-4 mr-2" />
          <span>Данные зашифрованы</span>
        </div>
      </div>
      
      <!-- Already have account -->
      <div class="text-center mt-6 text-gray-500">
        Уже есть аккаунт? 
        <router-link to="/login" class="text-sky-500 font-medium hover:text-sky-700 underline">
          Войти
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filled-field {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

/* Button enhancements */
.login-button {
  background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%) !important;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25) !important;
  transition: all 0.3s ease !important;
}

.login-button:hover {
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.35) !important;
  transform: translateY(-1px);
}

.cancel-button {
  transition: all 0.3s ease !important;
}

.cancel-button:hover {
  background-color: #d1d5db !important;
}

.security-badge {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 12px;
  color: #64748b;
  backdrop-filter: blur(4px);
}

/* Login side background shapes - more subtle */
.login-shape {
  position: absolute;
  z-index: 1;
  filter: blur(2px);
  transition: all 0.3s ease;
}

.login-circle-1 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.07) 0%, rgba(2, 132, 199, 0.07) 100%);
  border-radius: 50%;
  top: 15%;
  right: 15%;
}

.login-circle-2 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(2, 132, 199, 0.05) 100%);
  border-radius: 50%;
  bottom: 20%;
  left: 10%;
}

.login-rectangle-1 {
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.06) 0%, rgba(2, 132, 199, 0.06) 100%);
  border-radius: 16px;
  bottom: 40%;
  right: 5%;
  transform: rotate(25deg);
}

.login-rectangle-2 {
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.04) 0%, rgba(2, 132, 199, 0.04) 100%);
  border-radius: 12px;
  top: 60%;
  left: 20%;
  transform: rotate(-15deg);
}

.login-rectangle-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(2, 132, 199, 0.05) 100%);
  border-radius: 14px;
  top: 10%;
  left: 25%;
  transform: rotate(10deg);
}

@keyframes floatSubtle {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

/* Add smooth transition effects */
.v-btn,
.router-link {
  transition: all 0.3s ease;
}

/* Remove default Vuetify shadows */
:deep(.v-btn) {
  box-shadow: none !important;
}

:deep(.v-field) {
  box-shadow: none !important;
}

/* Input field enhancements */
:deep(.v-field) {
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
}

:deep(.v-field:focus-within) {
  border: 1px solid #38bdf8 !important;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.1) !important;
}
</style>