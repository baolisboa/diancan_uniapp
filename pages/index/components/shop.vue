<template>
	<view class="shop">
		<template v-if="buy.type == 0">
			<view class="select" @tap="selectShop">
				<text class="val">{{ buy.shop?.name || "请选择门店" }}</text>
				<text class="icon cl-icon-arrow-right"></text>
			</view>

			<view class="location">
				<text class="icon cl-icon-map-fill"></text>
				距离您{{ map.getDistance(buy.shop?.lng, buy.shop?.lat) }}km
			</view>
		</template>

		<template v-else>
			<view class="select" @tap="selectAddress">
				<text class="val">{{ address.info?.address || "请选择收货地址" }}</text>
				<text class="icon cl-icon-arrow-right"></text>
			</view>

			<view class="location">
				配送门店：
				<text class="name">{{ buy.shop?.name }}</text>
				<text class="change" @tap="selectShop">更换门店</text>
			</view>
		</template>

		<view class="switch">
			<view
				class="item"
				v-for="item in buy.typeList"
				:key="item.value"
				:class="{
					active: item.value == buy.type,
				}"
				@tap="selectType(item.value)"
			>
				{{ item.label }}
			</view>

			<view
				class="line"
				:style="{
					left: buy.type * 50 + '%',
				}"
			></view>
		</view>
	</view>

	<address-select
		:ref="setRefs('addressSelect')"
		:show-picker="false"
		@select="onAddressSelect"
	/>

	<shop-select :ref="setRefs('shopSelect')" :show-picker="false" />
</template>

<script setup lang="ts">
import { useCool } from "/@/cool";
import { useBuy, useAddress, useMap } from "/@/hooks";
import AddressSelect from "/@/components/address/select.vue";
import ShopSelect from "/@/components/shop/select.vue";

const { refs, setRefs } = useCool();
const buy = useBuy();
const address = useAddress();
const map = useMap();

function selectShop() {
	refs.shopSelect.open();
}

function selectAddress() {
	refs.addressSelect.open();
}

function onAddressSelect() {
	buy.selectType(1);
}

function selectType(val: number) {
	if (val == 1) {
		address.clear();
		refs.addressSelect.open();
	} else {
		buy.selectType(val);
	}
}
</script>

<style lang="scss" scoped>
.shop {
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 24rpx 32rpx 32rpx 32rpx;
	box-sizing: border-box;

	.select {
		display: flex;
		align-items: center;
		font-weight: bold;
		margin-bottom: 14rpx;
		padding-right: 220rpx;

		.val {
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 460rpx;
			font-size: 34rpx;
		}

		.icon {
			font-size: 28rpx;
			margin-left: 10rpx;
		}
	}

	.location {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: $cl-color-info;

		.icon {
			font-size: 30rpx;
			margin-right: 4rpx;
		}

		.change {
			margin-left: 20rpx;
			color: $cl-color-error;
		}

		.name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 250rpx;
		}
	}

	.switch {
		position: absolute;
		right: 32rpx;
		bottom: 48rpx;
		font-size: 22rpx;
		height: 50rpx;
		width: 160rpx;
		border-radius: 20rpx;
		background-color: #eee;
		display: flex;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			line-height: 1;
			color: #666;
			position: relative;
			z-index: 2;

			&.active {
				color: #fff;
			}
		}

		.line {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 50%;
			background-color: #000;
			border-radius: 20rpx;
			transition: all 0.2s;
		}
	}
}
</style>
