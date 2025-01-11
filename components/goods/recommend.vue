<template>
	<view
		class="goods-recommend"
		:class="{
			visible,
		}"
	>
		<cl-banner
			height="100%"
			:list="list"
			indicator-dots
			:radius="24"
			@select="onSelect"
		></cl-banner>
	</view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";
import { onMounted } from "vue";

const { service, router } = useCool();

const visible = ref(true);

const list = ref<Eps.InfoBannerEntity[]>([]);

function show() {
	visible.value = true;
}

function hide() {
	visible.value = false;
}

function refresh() {
	service.info.banner.list({ type: 2 }).then((res) => {
		list.value = res.map((e) => {
			return {
				url: e.pic,
				...e,
			};
		});
	});
}

function onSelect(index: number) {
	const item = list.value[index];

	if (item.path) {
		router.push(item.path);
	}
}

onMounted(() => {
	refresh();
});

defineExpose({
	show,
	hide,
});
</script>

<style lang="scss" scoped>
.goods-recommend {
	height: 0;
	transition: all 0.3s;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
	padding: 0 24rpx;

	&.visible {
		height: 280rpx;
	}
}
</style>
