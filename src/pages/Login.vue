<script setup>
import { useAppStore } from '@/stores/app';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// Using Heroicons instead of Lucide
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

// Language selector
const currentLanguage = ref('Рус');
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'Рус' ? 'Англ' : 'Рус';
};
</script>

<template>
  <section class="grid grid-cols-2 w-full h-screen relative">
    <!-- Left side - gradient background with animated rectangles -->
    <div class="w-full bg-gradient-to-r from-sky-500 to-blue-400 flex flex-col justify-center items-center px-60 text-white relative overflow-hidden">
      <!-- Animated rectangles for left side -->
      <div class="absolute inset-0 z-0">
        <!-- Rectangle 1 -->
        <div class="absolute top-[10%] left-[10%] w-24 h-24 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-30 transform rotate-6"></div>
        
        <!-- Rectangle 2 -->
        <div class="absolute top-[25%] left-[90%] w-32 h-32 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-30 transform -rotate-12"></div>
        
        <!-- Rectangle 3 -->
        <div class="absolute top-[80%] left-[15%] w-28 h-28 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-30 transform rotate-12"></div>
        
        <!-- Rectangle 4 -->
        <div class="absolute top-[80%] left-[70%] w-36 h-36 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-30 transform -rotate-6"></div>
        
        <!-- Rectangle 5 -->
        <div class="absolute top-[80%] left-[60%] w-20 h-20 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-30 transform rotate-3"></div>
        
        <!-- Rectangle 6 -->
        <div class="absolute top-[5%] left-[60%] w-28 h-28 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-30 transform -rotate-8"></div>
      </div>
      
      <div class="w-full relative z-10">
        <div class="mb-3 text-xl font-semibold">secure.storage</div>
        <h1 class="text-4xl font-semibold mb-4 tracking-tight">Безопасное хранение данных</h1>
        <div class="font-light text-sky-100 mb-10">
             Наш проект представляет собой веб-сайт, предназначенный для безопасного хранения и обработки чувствительных данных пользователей. В мире, где безопасность данных становится все более важной, мы предлагаем решения, которые обеспечивают высокий уровень защиты, надежности и конфиденциальности для личной и корпоративной информации.
             </div>
        <div class="mb-8 flex items-start">
          <div class="mr-4 mt-1 text-sky-200">
            <ShieldCheckIcon class="w-7 h-7" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Шифрование на уровне военных стандартов</h3>
            <p class="text-sky-100">Все данные шифруются с использованием алгоритма AES-256, который признан одним из самых надежных в мире.</p>
          </div>
        </div>
        
        <div class="mb-8 flex items-start">
          <div class="mr-4 mt-1 text-sky-200">
            <LockClosedIcon class="w-7 h-7" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Двухфакторная аутентификация</h3>
            <p class="text-sky-100">Дополнительный уровень защиты благодаря проверке личности через второе устройство.</p>
          </div>
        </div>
        
        <div class="mb-8 flex items-start">
          <div class="mr-4 mt-1 text-sky-200">
            <KeyIcon class="w-7 h-7" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Сквозное шифрование</h3>
            <p class="text-sky-100">Никто, включая наших сотрудников, не имеет доступа к вашим данным. Ключи шифрования хранятся только у вас.</p>
          </div>
        </div>
        
        <div class="mb-8 flex items-start">
          <div class="mr-4 mt-1 text-sky-200">
            <ServerIcon class="w-7 h-7" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Распределенное хранение</h3>
            <p class="text-sky-100">Данные хранятся фрагментированно на нескольких серверах, что защищает от потери и несанкционированного доступа.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - login form -->
    <div class="h-full flex w-full flex-col px-20 py-5 relative overflow-hidden">

      <!-- Language selector in top right -->
      <div class="flex justify-between items-center relative z-10">
        <div class="text-xl font-semibold">secure.storage</div>
        <div class="relative group">
          <button 
            class="px-3 py-1 rounded-md border border-gray-300 flex items-center hover:bg-gray-50 transition-colors duration-200"
            @click="toggleLanguage"
          >
            {{ currentLanguage }} 
            <span class="ml-2">▼</span>
          </button>
          <div class="absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-20 overflow-hidden hidden group-hover:block z-20">
            <div 
              class="px-3 py-2 hover:bg-sky-50 cursor-pointer transition-colors duration-200"
              @click="currentLanguage = 'Рус'"
            >
              Рус
            </div>
            <div 
              class="px-3 py-2 hover:bg-sky-50 cursor-pointer transition-colors duration-200"
              @click="currentLanguage = 'Англ'"
            >
              Англ
            </div>
          </div>
        </div>
      </div>

      <!-- Login form -->
      <div class="mt-80 flex flex-col justify-center items-center relative z-10">
        <div class="w-[400px]">
          <h2 class="text-2xl font-semibold text-gray-800">
            Войти в систему
          </h2>
          <div class="mt-2 mb-7 text-gray-500">Войдите используя username и пароль</div> 
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Логин
            </label>
            <v-text-field 
              v-model="userData.username" 
              variant="outlined"
              class="filled-field mb-6"
              hide-details
              rounded="md"
              density="compact"
              placeholder="Введите ваш логин"
            />
            
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Пароль
            </label>
            <v-text-field 
              v-model="userData.password" 
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              variant="outlined"
              class="filled-field"
              hide-details
              rounded="md"
              density="compact"
              placeholder="Введите ваш пароль"
              @click:append-inner="visible = !visible"
            />
            
            <div class="flex justify-center mt-10">
              <v-btn
                color="#38bdf8" 
                flat 
                text="Войти"
                class="text-none h-12 font-medium w-full text-white"
                rounded="lg"
                @click="loginUser"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mt-8 flex gap-2 ml-auto flex text-center text-gray-600">
              <p class="mb-2">
                Нет аккаунта?
              </p>
              <router-link to="/registration" class="text-sky-500 font-medium hover:text-sky-700 underline">
                Регистрация
              </router-link>
            </div>
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
</style>