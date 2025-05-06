<script setup>
import { useAppStore } from '@/stores/app';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ShieldCheckIcon, LockClosedIcon, KeyIcon, ServerIcon } from '@heroicons/vue/24/outline';

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

const currentLanguage = ref('Рус');
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'Рус' ? 'Англ' : 'Рус';
};

// Animation configurations for left side
const animateShapes = () => {
  const shapes = document.querySelectorAll('.animated-shape');
  
  shapes.forEach(shape => {
    // Random duration between 15-30 seconds
    const duration = 15 + Math.random() * 15;
    // Random delay between 0-5 seconds
    const delay = Math.random() * 5;
    
    shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Set random initial positions
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.left = `${Math.random() * 100}%`;
  });
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
  animateShapes();
  animateLoginBackground();
});
</script>

<template>
  <section class="grid grid-cols-2 w-full h-screen relative">
    <div class="w-full bg-gradient-to-r from-sky-500 to-blue-400 flex flex-col justify-center items-center text-center px-16 text-white relative overflow-hidden">
      <!-- Animated shapes -->
      <div class="animated-shape rectangle-1"></div>
      <div class="animated-shape rectangle-2"></div>
      <div class="animated-shape circle-1"></div>
      <div class="animated-shape rectangle-3"></div>
      <div class="animated-shape circle-2"></div>
      <div class="animated-shape rectangle-4"></div>
      
      <!-- Content -->
      <div class="z-10 relative">
        <div class="flex items-center justify-center mb-6">
          <ShieldCheckIcon class="h-12 w-12 text-white" />
        </div>
        <div class="text-sm text-white">Более 20 000+ довольных<br/>пользователей</div> 
        <div class="text-4xl font-medium">Безопасное Хранение Данных</div>
        <div class="text-lg mt-4 text-blue-100">Наш проект представляет собой веб-сайт, предназначенный для безопасного <br/>хранения и обработки чувствительных данных пользователей.</div>
        
        <!-- Feature icons -->
        <div class="flex justify-center gap-10 mt-8">
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-3 rounded-full mb-2">
              <LockClosedIcon class="h-6 w-6 text-white" />
            </div>
            <span class="text-sm">Шифрование</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-3 rounded-full mb-2">
              <KeyIcon class="h-6 w-6 text-white" />
            </div>
            <span class="text-sm">Безопасность</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-3 rounded-full mb-2">
              <ServerIcon class="h-6 w-6 text-white" />
            </div>
            <span class="text-sm">Облачное хранение</span>
          </div>
        </div>
        
        <a href="registration" class="block mt-8 w-64 bg-white text-blue-500 py-2 rounded-xl mx-auto hover:bg-blue-50 transition-colors">Создать аккаунт</a>
      </div>
    </div>
    <div class="h-full flex w-full flex-col px-20 py-5 relative overflow-hidden bg-gradient-to-br from-gray-50 to-sky-50">
      <!-- Background design elements for login side -->
      <div class="login-shape login-circle-1"></div>
      <div class="login-shape login-circle-2"></div>
      <div class="login-shape login-rectangle-1"></div>
      <div class="login-shape login-rectangle-2"></div>
      <div class="login-shape login-rectangle-3"></div>
      
      <!-- Light glow effect in corner -->
      <div class="absolute w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-20 -top-32 -right-32"></div>
      <div class="absolute w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-10 bottom-20 -left-20"></div>

      <div class="flex justify-between items-center relative z-10">
        <div class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">secure.storage</div>
      </div>

      <!-- Login form with improved visual design -->
      <div class="mt-16 flex flex-col justify-center items-center relative z-10">
        <div class="w-full max-w-[400px] bg-white/50 mt-60 backdrop-blur-sm p-8 rounded-2xl">
          <div class="flex items-center mb-6">
            <div class="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
              <LockClosedIcon class="h-5 w-5 text-white" />
            </div>
            <h2 class="text-3xl font-semibold text-gray-800 ml-3">
              Войти в систему
            </h2>
          </div>
          <div class="mb-7 text-gray-500">Войдите используя username и пароль</div> 
          <div>
            <label class="block text-gray-500 text-sm font-semibold mb-2">
              Логин
            </label>
            <v-text-field 
              v-model="userData.username" 
              variant="outlined"
              class="filled-field mb-6 bg-white border-gray-100 text-2xl"
              hide-details
              rounded="md"
              density="compact"
              placeholder="Введите ваш логин"
            />
            
            <label class="block text-gray-500 text-sm font-semibold mb-2">
              Пароль
            </label>
            <v-text-field 
              v-model="userData.password" 
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              variant="outlined"
              class="filled-field bg-white border-gray-100 text-2xl"
              hide-details
              rounded="md"
              density="compact"
              placeholder="Введите ваш пароль"
              @click:append-inner="visible = !visible"
            />
            
            <div class="flex justify-center mt-8">
              <v-btn
                color="#38bdf8" 
                flat 
                text="Войти"
                class="text-none h-12 font-medium w-full text-white text-[16px] font-semibold login-button"
                rounded="lg"
                @click="loginUser"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mt-6 flex gap-2 justify-center text-center text-gray-600">
              <p class="mb-2">
                Нет аккаунта?
              </p>
              <router-link to="/registration" class="text-sky-500 font-medium hover:text-sky-700 underline">
                Регистрация
              </router-link>
            </div>
          </div>
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.filled-field {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

/* Login form enhancements */
.login-button {
  background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%) !important;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25) !important;
  transition: all 0.3s ease !important;
}

.login-button:hover {
  box-shadow: 0 6px 16px rgba(56, 189, 248, 0.35) !important;
  transform: translateY(-1px);
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

/* Animated shapes styling for left side */
.animated-shape {
  position: absolute;
  opacity: 0.1;
  z-index: 1;
  filter: blur(1px);
  transition: all 0.3s ease;
}

.rectangle-1 {
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 20px;
  top: 20%;
  left: 10%;
  transform: rotate(15deg);
}

.rectangle-2 {
  width: 200px;
  height: 100px;
  background-color: white;
  border-radius: 15px;
  bottom: 20%;
  right: 15%;
  transform: rotate(-10deg);
}

.rectangle-3 {
  width: 120px;
  height: 250px;
  background-color: white;
  border-radius: 20px;
  top: 60%;
  left: 25%;
  transform: rotate(45deg);
}

.rectangle-4 {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  top: 15%;
  right: 25%;
  transform: rotate(30deg);
}

.circle-1 {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  bottom: 30%;
  left: 30%;
}

.circle-2 {
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 50%;
  top: 40%;
  right: 10%;
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

@keyframes float {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
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