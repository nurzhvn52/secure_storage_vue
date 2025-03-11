<script setup>
import ItemForm from '@/components/ItemForm.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const items = ref([
    { title: 'Item 1', username: 'rrre', password: 'rrre', sites: [] },
    { title: 'Item 2', username: 'test', password: 'test', sites: [] }
]);

const selectedItem = ref(null);

watch(route, () => {
    if (route.fullPath.includes('create')) {
        selectedItem.value = {
            title: null,
            username: null,
            password: null,
            sites: [ { link: null } ],
        }
    }
});

onMounted(() => {
    if (route.fullPath.includes('create')) {
        selectedItem.value = {
            title: null,
            username: null,
            password: null,
            sites: [ { link: null } ],
        }
    }
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
                    @click="selectedItem = item"
                >
                    <template v-slot:prepend>
                        <img 
                            src="@/assets/images/logo.svg" 
                            class="w-8 h-8 min-w-8 min-h-8 mr-4" 
                        />
                    </template>
                    <v-list-item-title class="text-lg">
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </div>
        <div class="w-full flex justify-center py-10">
            <ItemForm v-if="selectedItem" :form="selectedItem" />
        </div>
    </div>
</template>