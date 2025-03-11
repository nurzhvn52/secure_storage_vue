<script setup>
import { ref } from 'vue';

const props = defineProps({
    form: Object
});

const showPass = ref(false);
</script>

<template>
    <div class="flex flex-col w-8/12">
        <div class="flex items-center gap-5">
            <img 
                src="@/assets/images/logo.svg" 
                class="w-16 h-16 mr-4 rounded-full" 
            />
            <v-text-field 
                variant="outlined"
                hide-details
                v-model="form.title"
            />
        </div>
        <div class="p-6 rounded-t-lg bg-[#E7E7E7] mt-8 mb-1">
            <v-text-field 
                label="username" 
                variant="underlined"
                hide-details
                v-model="form.username"
            />
        </div>
        <div class="p-6 rounded-b-lg bg-[#E7E7E7]">
            <v-text-field 
                label="password" 
                variant="underlined"
                hide-details
                v-model="form.password"
                :append-inner-icon="showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :type="showPass ? 'text' : 'password'"
                @click:append-inner="showPass = !showPass"
            />
        </div>

        <div class="p-6 rounded-t-lg border mt-8 mb-1">
            <div
                v-for="(site, index) of form.sites"
                :key="index"
                class="flex items-center"
            >
                <v-text-field 
                    label="website" 
                    variant="underlined"
                    hide-details
                    v-model="site.link"
                    class="mb-3"
                />
                <v-btn 
                    v-if="index !== 0 && form.sites.length > 1"
                    icon="mdi-trash-can-outline" 
                    variant="text" 
                    size="small"
                    @click="form.sites.splice(index, 1)"
                />
            </div>
            <v-btn 
                text="add more" 
                class="text-none mt-2"
                prepend-icon="mdi-plus"
                variant="text"
                rounded="xl"
                @click="form.sites.push({ link: null })"
            />
        </div>
    </div>
</template>