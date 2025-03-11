<script setup>
import { toRefs } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  items: Array,
  title: String,
});

const goBack = () => {
  window.history.back();
};
</script>

<template>
  <v-col class="w-fit mb-0 pb-2 px-0 py-0 mt-2">
    <v-breadcrumbs :items="items" class="px-0 py-0">
      <template v-slot:title="{ item }">
        <span class="first-letter:uppercase text-[#768498] xl:text-base lg:text-sm md:text-sm sm:text-sm">
          {{ item.title }}
		</span>
      </template>
      <template v-slot:divider>
        <img
          class="w-[6px] h-[12px] mt-1"
          src="/src/assets/back-icon.svg"
          alt="back"
        />
      </template>
    </v-breadcrumbs>
    <h1 class="xl:text-[36px] lg:text-2xl md:text-2xl sm:text-2xl font-semibold mb-4 text-[#373F46]">
      {{ title }}
    </h1>
  </v-col>
</template>