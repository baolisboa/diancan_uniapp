<template>
	<view
		class="address-item"
		:style="{
			backgroundColor,
		}"
	>
		<view class="address-item__inner">
			<template v-if="item">
				<cl-text block bold :size="30" :line-height="1.4" :margin="[0, 0, 14, 0]">
					{{ item?.address }}
					{{ item?.detail }}
				</cl-text>

				<cl-row type="flex">
					<cl-text color="info">{{ item?.contact }}</cl-text>
					<cl-text
						color="info"
						type="phone"
						:margin="[0, 20, 0, 100]"
						:value="item?.phone"
					/>
				</cl-row>
			</template>

			<template v-else>
				<cl-text block bold :size="30" :margin="[6, 0, 14, 0]">选择地址</cl-text>
				<cl-text color="info" :size="24">设置默认地址后优先使用</cl-text>
			</template>
		</view>

		<view class="address-item__icon">
			<slot name="icon"> </slot>
		</view>
	</view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
	item: Object as PropType<Eps.UserAddressEntity>,
	backgroundColor: {
		type: String,
		default: "#ffffff",
	},
});
</script>

<style lang="scss" scoped>
.address-item {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	border-radius: 24rpx;
	padding: 24rpx;

	&__inner {
		flex: 1;
	}

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: initial;
		font-size: 32rpx;
		margin-left: 24rpx;
	}
}
</style>
