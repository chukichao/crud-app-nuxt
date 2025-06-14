<template>
	<select
		:value="modelValue"
		@change="
			$emit('update:modelValue', ($event.target as HTMLSelectElement).value)
		"
	>
		<option value="" disabled>{{ title }}</option>
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.title }}
		</option>
	</select>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);

interface IOption {
	title: string;
	value: string;
}

defineProps<{
	modelValue: string | number | null;
	options: IOption[];
	title?: string;
}>();
</script>
