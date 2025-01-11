<template>
	<view
		class="shop-item"
		:style="{
			backgroundColor,
		}"
	>
		<view class="shop-item__inner">
			<template v-if="item">
				<cl-row type="flex" justify="space-between" :margin="[0, 0, 12, 0]">
					<cl-text bold :size="30">{{ item.name }}</cl-text>
					<cl-text color="info" :size="24"
						>{{ map.getDistance(item.lng, item.lat) }}km</cl-text
					>
				</cl-row>

				<cl-text block :line-height="1.4" color="info" :size="24" :margin="[0, 0, 10, 0]">
					{{ item.address }}
				</cl-text>

				<cl-text block color="info" :size="24">
					{{ item.startBusinessHours }} - {{ item.endBusinessHours }}
				</cl-text>

				<view class="op">
					<view class="icon" @tap.stop="toCall">
						<cl-icon name="phone"></cl-icon>
					</view>

					<view class="icon" @tap.stop="toLocation">
						<cl-icon name="map"></cl-icon>
					</view>
				</view>
			</template>

			<template v-else>
				<cl-text block bold :size="30" :margin="[6, 0, 14, 0]">选择门店</cl-text>
				<cl-text color="info" :size="24">现在下单，立即制作</cl-text>
			</template>
		</view>

		<view class="shop-item__icon">
			<slot name="icon"> </slot>
		</view>
	</view>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { useMap } from "/@/hooks";

const props = defineProps({
	item: Object as PropType<Eps.ShopInfoEntity>,
	backgroundColor: {
		type: String,
		default: "#ffffff",
	},
});

const map = useMap();

function toCall() {
	uni.makePhoneCall({
		phoneNumber: props.item?.phone!,
	});
}

function toLocation() {
	const { lat, lng, name, address } = props.item || {};

	uni.openLocation({
		latitude: lat,
		longitude: lng,
		name,
		address,
	});
}
</script>

<style lang="scss" scoped>
.shop-item {
	border-radius: 24rpx;
	padding: 24rpx;
	width: 100%;
	box-sizing: border-box;
	position: relative;

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
		position: absolute;
		right: 24rpx;
		top: calc(50% - 16rpx);
	}

	.op {
		display: flex;
		margin-top: 20rpx;

		.icon {
			height: 60rpx;
			width: 60rpx;
			border-radius: 50%;
			background-color: #f7f7f7;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 24rpx;
		}
	}
}
</style>
