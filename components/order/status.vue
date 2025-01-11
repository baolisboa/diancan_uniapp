<template>
	<cl-text :size="size" :color="status?.color">{{ status?.label }}</cl-text>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { OrderStatus } from "/@/dict";

const props = defineProps({
	status: Number,
	size: Number,
});

const status = computed(() => {
	return OrderStatus.find((e) => e.value == props.status);
});
</script>
