<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const appStore = useAppStore();
const router = useRouter();
const selectedItem = ref(null);
const searchText = ref(null);
const items = ref([]);
const langMenu = ref(false);

const changeLanguage = (lang) => {
    locale.value = lang;
    sessionStorage.setItem('lang', lang);
    langMenu.value = false
};

const goToCreatePage = () => window.location = '/storage/create';

const searchItems = async () => {
    if (searchText.value && searchText.value.length) {
        setTimeout(async () => {
            const response = await appStore.getData('/api/secure-storage/storage/?storage_name=' + searchText.value);
            if (response && response.data) {
                items.value = response.data.results?.body;
            }
        }, 1500);
    }
};

const clearSearch = async () => {
    selectedItem.value = null;
    searchText.value = null;
    items.value = [];
};

const selectItem = () => {
    searchText.value = null;
    router.push({ name: 'Show Storage Item', params: { itemId: selectedItem.value } });
};
</script>

<template>
    <div class="flex border-b border-[#efefef]">
        <header class="py-3 flex items-center justify-between w-[1300px] mx-auto px-5">
            <div class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">secure.storage</div>

            <div class="w-[350px]">
                <v-autocomplete :placeholder="$t('search')" variant="outlined" density="compact" hide-details
                    prepend-inner-icon="mdi-magnify" clearable v-model="selectedItem" rounded="xl"
                    v-model:search="searchText" :items="items" item-title="name" item-value="id" hide-no-data
                    @update:search="searchItems" @update:modelValue="selectItem" @click:clear="clearSearch" />
            </div>
            <div class="flex items-center gap-4">
                <v-btn :text="$t('add_item')" class="text-none" prepend-icon="mdi-plus" flat color="#070ACA"
                    rounded="xl" @click="goToCreatePage" />
                <v-menu v-model="langMenu" activator="#lang-changer" offset-y>
                    <v-list>
                        <v-list-item title="RU" class="uppercase" @click="changeLanguage('ru')" />
                        <v-list-item title="KK" class="uppercase" @click="changeLanguage('kk')" />
                        <v-list-item title="EN" class="uppercase" @click="changeLanguage('en')" />
                    </v-list>
                </v-menu>
                <v-btn id="lang-changer" variant="text" rounded="xl" class="text-[#070ACA]">
                    {{ $i18n.locale }}
                    <v-icon size="18" class="ml-1">
                        {{ langMenu ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </v-btn>
            </div>
        </header>
    </div>
</template>
