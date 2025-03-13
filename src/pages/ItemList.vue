<script setup>
import ItemForm from '@/components/ItemForm.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const items = ref([]);
const selectedItem = ref(null);
const categories = ref([]);
const selectedCategory = ref(null);
const loading = ref(false);
const loadDetails = ref(false);
const changedFields = ref([]);

const getStorage = async () => {
    loading.value = true;
    const response = await appStore.getData('/api/secure-storage/storage/');
    if (response.data) {
        items.value = response.data.results.body;
        selectedItem.value = null;
        loading.value = false;
    }
};

const getDetails = async (item) => {
    loadDetails.value = true;
    const response = await appStore.getData('/api/secure-storage/storage/app/' + item.id);
    if (response?.data) {
        selectedItem.value = response.data.body;
        selectedItem.value.forEach(item => {
            if (item.type_value === 'date' && item.value) item.value = new Date(item.value);
        });
        loadDetails.value = false;
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

const getCurrentValue = (item) => {
    if (item.value) {
        if (item.type_value === 'date') {
            return new Date(item.value).toISOString().split('T')[0];
        }
        else return item.value;
    }
    else return null;
};

const saveStorage = async () => {
    if (selectedItem.value[0] && selectedItem.value[0].record) {
        const indicators = changedFields.value.map(item => {
            return { id: item.id, type: item.type_value, value: getCurrentValue(item) };
        });
        const data = {
            records: [{
                record_id: changedFields.value[0].record,
                indicators: indicators
            }]
        };
        const response = await appStore.patchData('/api/secure-storage/storage/app/', data);
        if (response) {
            selectedItem.value = null;
            await getStorage();
        }
    } else {
        const indicators = selectedItem.value.map(item => {
            return { code: item.code, type: item.type_value, value: getCurrentValue(item) };
        });
        const data = {
            code: selectedCategory.value,
            indicators: indicators
        };
        const response = await appStore.postData('/api/secure-storage/storage/app/', data);
        if (response) {
            router.push({ name: 'Storage' });
            selectedItem.value = null;
        }
    }
};

const showCategoriesSelect = computed(() => {
    if (route.fullPath.includes('/create') && (selectedItem.value && selectedItem.value[0] && !selectedItem.value[0].record) 
        || !selectedItem.value) {
            return true
    }
    else return false;
});

const addChangedField = (item) => {
    const hasField = changedFields.value.find(field => field.id === item.id);
    if (hasField) hasField.value = item.value;
    else changedFields.value.push(item);
};

watch(route, async () => {
    await getStorage();
    await getCategories();
});

onMounted(async () => {
    await getStorage();
    await getCategories();
});
</script>

<template>
    <div class="flex" style="height: calc(100vh - 112px);">
        <img v-if="loading" src="@/assets/images/loader.gif" class="h-10 w-10 mx-auto my-10" alt="loader" />
        <template v-else>
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
                <img v-if="loadDetails" src="@/assets/images/loader.gif" class="h-10 w-10 mx-auto my-10" alt="loader" />
                <template v-else>
                    <div 
                        v-if="showCategoriesSelect" 
                        class="rounded-t-lg mb-1 w-8/12"
                    >
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
                        @update="addChangedField"
                        @closeForm="selectedItem = null;"
                    />
                </template>
            </div>
        </template>
    </div>
</template>