<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();
const selectedItem = ref(null);
const searchText = ref(null);
const items = ref([])

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
    <header class="py-5 pl-[100px] pr-10 h-[64px] border-b flex items-center justify-between">
        <div class="w-[400px]">
            <v-autocomplete 
                placeholder="Search for item" 
                variant="outlined"
                density="compact"
                hide-details
                prepend-inner-icon="mdi-magnify"
                clearable
                v-model="selectedItem"
                v-model:search="searchText"
                :items="items"
                item-title="name"
                item-value="id"
                hide-no-data
                @update:search="searchItems"
                @update:modelValue="selectItem"
                @click:clear="clearSearch"
            />
        </div>
        <v-btn 
            text="Add item" 
            class="text-none"
            prepend-icon="mdi-plus"
            flat
            color="#070ACA"
            rounded="xl"
            @click="goToCreatePage"
        />
    </header>
</template>