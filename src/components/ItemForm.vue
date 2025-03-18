<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

const props = defineProps({
    form: Object,
});

const emit = defineEmits(['saveData', 'update', 'closeForm']);

const appStore = useAppStore();
const showPass = ref(null);

const getParams = async (field) => {
    if (!field.parameters?.length) {
        const response = await appStore.getData('/api/stm/list-values/bylist/' + field.type_extend + '/');
        if (response) field.parameters = response.data;
    }
};
</script>

<template>
    <div class="flex flex-col w-8/12">
        <div 
            v-for="formItem of form"
            :key="formItem.code"
            class="p-6 rounded-t-lg border mt-8 mb-1"
        >
            <v-textarea 
                v-if="formItem.type_value === 'text'"
                :label="formItem.short_name[$i18n.locale]" 
                variant="underlined"
                hide-details
                v-model="formItem.value"
                class="mb-3"
                @blur="emit('update', formItem)"
            />
            <v-text-field 
                v-if="formItem.type_value === 'str'"
                :label="formItem.short_name[$i18n.locale]" 
                variant="underlined"
                hide-details
                v-model="formItem.value"
                @blur="emit('update', formItem)"
            />
            <v-text-field 
                v-if="formItem.type_value === 'binary'"
                :label="formItem.short_name[$i18n.locale]" 
                variant="underlined"
                hide-details
                v-model="formItem.value"
                :append-inner-icon="showPass === formItem.id ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="showPass === formItem.id ? 'text' : 'password'"
                @click:append-inner="showPass === formItem.id ? showPass = null : showPass = formItem.id"
                @blur="emit('update', formItem)"
            />
            <v-text-field 
                v-if="formItem.type_value === 'int'"
                :label="formItem.short_name[$i18n.locale]" 
                type="number"
                variant="underlined"
                hide-details
                v-model="formItem.value"
                @blur="emit('update', formItem)"
            />
            <v-select 
                v-if="formItem.type_value === 'list'"
                :label="formItem.short_name[$i18n.locale]" 
                variant="underlined"
                hide-details
                :items="formItem.parameters"
                item-title="short_name.en"
                item-value="id"
                v-model="formItem.value"
                @click="getParams(formItem)"
                @update:model-value="emit('update', formItem)"
            />
            <v-date-input 
                v-if="formItem.type_value === 'date'"
                :label="formItem.short_name[$i18n.locale]" 
                variant="underlined"
                hide-details
                v-model="formItem.value"
                @update:model-value="emit('update', formItem)"
            />
        </div>
        <div class="mt-6 flex justify-end gap-5">
            <v-btn 
                :text="$t('save')" 
                class="text-none"
                flat
                color="#070ACA"
                rounded="xl"
                width="112"
                @click="emit('saveData')"
            />
            <v-btn 
                :text="$t('cancel')" 
                class="text-none"
                flat
                color="#E1E1E3"
                rounded="xl"
                width="112"
                @click="emit('closeForm')"
            />
        </div>
    </div>
</template>