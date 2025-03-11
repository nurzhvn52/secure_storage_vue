<template>
    <header class="py-5 pl-[100px] pr-10 h-[64px] border-b flex items-center justify-between">
        <div class="w-[400px]">
            <v-text-field 
                placeholder="Search for item" 
                variant="outlined"
                density="compact"
                hide-details
                prepend-inner-icon="mdi-magnify"
            />
        </div>
        <v-btn 
            text="Add item" 
            class="text-none"
            prepend-icon="mdi-plus"
            flat
            color="#070ACA"
            rounded="xl"
            @click="$router.push({ name: 'Create Storage Item' })"
        />
    </header>
</template>