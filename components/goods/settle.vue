<template>
	<view
		class="settle"
		:class="{
			visible,
		}"
	>
		<view class="info" @tap="open">
			<cl-badge :value="spCart.num" :margin="[8, 0]">
				<image class="icon" src="/static/goods/cup.png" />
			</cl-badge>

			<cl-text
				type="price"
				color="#fff"
				bold
				:size="42"
				:value="spCart.amount"
				:margin="[0, 0, 0, 18]"
			/>
		</view>

		<view
			class="buy"
			:class="{
				active: spCart.num > 0,
			}"
			@tap="buy"
		>
			去结算
		</view>
	</view>

	<!-- 购物车 -->
	<cl-popup direction="bottom" v-model="visible" :padding="0" :border-radius="[16, 16, 0, 0]">
		<view class="sp-cart">
			<view class="head">
				<cl-text :size="28" bold>已选商品 {{ spCart.num }}</cl-text>

				<cl-text color="#777" @tap="clear()">清空购物车</cl-text>
			</view>

			<scroll-view scroll-y class="scroller">
				<view class="list">
					<goods-item
						v-for="item in spCart.list"
						:key="item.uid"
						:item="item"
						:show-tags="false"
					>
						<template #num>
							<cl-input-number v-model="item.count" @change="onNumChange(item)" />
						</template>
					</goods-item>
				</view>
			</scroll-view>
		</view>
	</cl-popup>
</template>

<script lang="ts" setup>
import { useCool } from "/@/cool";
import { ref, watch } from "vue";
import { useSpCart } from "/@/hooks";
import GoodsItem from "./item.vue";
import { useUi } from "/$/cool-ui";
import { isEmpty } from "lodash-es";

const { service, router } = useCool();
const spCart = useSpCart();
const ui = useUi();

const visible = ref(false);

function open() {
	if (!isEmpty(spCart.list)) {
		visible.value = true;
	}
}

function close() {
	visible.value = false;
}

function buy() {
	if (!isEmpty(spCart.list)) {
		close();

		router.push({
			path: "/pages/order/submit",
		});
	}
}

function clear() {
	ui.showConfirm({
		title: "提示",
		message: "确定清空购物车吗？",
		callback(action) {
			if (action == "confirm") {
				spCart.clear();
			}
		},
	});
}

function onNumChange(item: GoodsInfo) {
	if (item.count == 0) {
		spCart.remove(item);
	}
}

watch(
	() => spCart.list.length,
	(len) => {
		if (len == 0) {
			close();
		}
	},
);
</script>

<style lang="scss" scoped>
.settle {
	display: flex;
	align-items: center;
	height: 100rpx;
	width: calc(100% - 64rpx);
	background: #0009;
	backdrop-filter: blur(10rpx);
	border-radius: 18rpx;
	position: fixed;
	left: 32rpx;
	bottom: calc(152rpx + env(safe-area-inset-bottom));
	z-index: 700;
	transition: all 0.3s;

	&.visible {
		bottom: calc(32rpx + env(safe-area-inset-bottom));
	}

	.info {
		display: flex;
		align-items: center;
		flex: 1;
		padding-left: 32rpx;

		.icon {
			display: block;
			height: 48rpx;
			width: 48rpx;
		}
	}

	.buy {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #fff;
		height: 100%;
		padding: 0 40rpx;
		border-radius: 0 18rpx 18rpx 0;
		background-color: #8889;

		&.active {
			background-color: #3339;
		}
	}
}

.sp-cart {
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		height: 80rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx 16rpx 0 0;
	}

	.scroller {
		max-height: 60vh;
	}

	.list {
		padding-bottom: 154rpx;
		background-color: #fff;

		.item {
			display: flex;
			position: relative;
			padding: 32rpx;

			.pic {
				height: 120rpx;
				width: 120rpx;
				margin-right: 24rpx;
				background-color: rgba($cl-color-primary, 0.05);
				border-radius: 16rpx;
			}

			.det {
				flex: 1;
			}

			.num {
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
}
</style>
