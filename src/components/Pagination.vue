<script setup>
import { ref } from "vue";

const props = defineProps({
	length: Number,
	pageNum: {
		type: Number,
		default: null,
	},
});

const emit = defineEmits(["changePage"]);

const currentPage = ref(props.pageNum ? props.pageNum : 1);
</script>

<template>
	<div class="text-center">
		<v-container class="px-0">
			<v-row justify="end">
				<v-col cols="8">
					<v-container class="max-width px-0">
						<v-pagination
							v-model="currentPage"
							:length="length"
							:total-visible="5"
							rounded="lg"
							border
							color="#333333"
							class="my-4"
							@update:modelValue="emit('changePage', currentPage)"
						/>
					</v-container>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<style lang="scss">
.v-pagination__list {
  	justify-content: end !important;
	.v-btn {
		border-color: #F1F1F1;
	}
}
.v-pagination .v-pagination__item--is-active .v-btn__overlay {
    background: #0670DA;
    opacity: 1;
}
.v-pagination .v-pagination__item--is-active .v-btn__content {
    color: white;
	z-index: 1;
}
</style>