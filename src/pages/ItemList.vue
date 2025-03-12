<script setup>
import ItemForm from '@/components/ItemForm.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';

const router = useRouter();
const appStore = useAppStore();
const items = ref([]);
const selectedItem = ref(null);
const categories = ref([]);
const selectedCategory = ref(null);

const getStorage = async () => {
    const response = await appStore.getData('/api/secure-storage/storage/');
    if (response.data) {
        items.value = response.data.results.body;
    }
};

const getDetails = async (item) => {
    const response = await appStore.getData('/api/secure-storage/storage/app/' + item.id);
    if (response.data) {
        selectedItem.value = response.data.body;
    }
};

const getCategories = async () => {
    const response = await appStore.getData('/api/secure-storage/storage/document-abstraction/');
    if (response.data) {
        categories.value = response.data;
    }
};

const selectCategory = async () => {
    const response = await appStore.getData('/api/secure-storage/storage/get-for-post/?code=' + selectedCategory.value);
    if (response.data) {
        selectedItem.value = response.data;
    }
};

const saveStorage = async () => {
    const indicators = selectedItem.value.map(item => {
        return { code: item.code, type: item.type_value, value: item.value };
    });
    const data = {
        code: selectedCategory.value,
        indicators: indicators
    };
    const response = await appStore.postData('/api/secure-storage/storage/app/', data);
    if (response) {
        router.push({ name: 'Storage' });
    }
};

onMounted(async () => {
    await getStorage();
    await getCategories();
});
</script>

<template>
    <div class="flex" style="height: calc(100vh - 112px);">
        <div class="w-1/4 border-r border-solid border-[#9b9b9b78] pr-10">
            <v-list>
                <v-list-item 
                    v-for="(item, index) of items" 
                    :key="index" 
                    class="mb-2"
                    @click="getDetails(item)"
                >
                    <template v-slot:prepend>
                        <img 
                            src="@/assets/images/logo.svg" 
                            class="w-8 h-8 min-w-8 min-h-8 mr-4" 
                        />
                    </template>
                    <v-list-item-title class="text-lg">
                        {{ item.name }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </div>
        <div class="w-full flex flex-col items-center py-10 h-full overflow-auto">
            <div v-if="$route.fullPath.includes('/create')" class="rounded-t-lg mb-1 w-8/12">
                <v-select 
                    label="Категории" 
                    variant="underlined"
                    hide-details
                    :items="categories"
                    item-title="document_short_name.ru"
                    item-value="document_code"
                    v-model="selectedCategory"
                    @update:model-value="selectCategory"
                />
            </div>
            <ItemForm 
                v-if="selectedItem" 
                :form="selectedItem" 
                :categories="categories" 
                @saveData="saveStorage"
            />
        </div>
    </div>
</template>