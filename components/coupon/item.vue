<template>
	<view
		class="coupon-item"
		:class="{
			'is-disabled': info.useStatus == 1 || disabled,
			'is-border': border,
		}"
	>
		<view class="info">
			<view class="a">
				<text class="amount">{{ info.amount || "9" }}</text>
				<text class="doc">{{ doc || "无限制" }}</text>
			</view>

			<view class="b">
				<text class="title">{{ info.title || "2周年请你喝奶茶" }}</text>

				<text class="time">{{ info.time }}</text>
			</view>
		</view>

		<view class="op">
			<view class="inner">
				<cl-row type="flex" @tap.stop="toRule">
					<cl-text :size="24">使用规则</cl-text>

					<view
						class="icon"
						:class="{
							expand: isExpand,
						}"
					>
						<text class="cl-icon-arrow-top"></text>
					</view>
				</cl-row>

				<cl-button size="small" round type="info" disabled v-if="info.useStatus == 1">
					已使用
				</cl-button>

				<cl-button size="small" round type="primary" v-else-if="checked">
					使用中
				</cl-button>

				<cl-button size="small" round type="primary" @tap="toUse()" v-else>
					{{ disabled ? "不可用" : selectable ? "使用" : "去使用" }}
				</cl-button>
			</view>

			<view class="content" v-if="isExpand">
				<text>(1)本券不兑换现金、不设找要，不退不换</text>
				<text>(2)本券不支持与基他优惠活动同享</text>
				<text>(3)每人限领一张(手机号码、手机设备、会员ID、支付账号等)</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import dayjs from "dayjs";
import { useCool } from "/@/cool";
import { ref } from "vue";

const props = defineProps({
	item: {
		type: Object as PropType<Eps.MarketCouponInfoEntity>,
		default: () => ({}),
	},
	checked: Boolean,
	disabled: Boolean,
	border: Boolean,
	selectable: Boolean,
});

const { router } = useCool();

// 详情
const info = computed(() => {
	return {
		...props.item,
		amount: Math.floor(props.item.amount!),
		useStatus: props.item.useStatus,
		time:
			dayjs(props.item.startTime).format("YYYY-MM-DD") +
			" ~ " +
			dayjs(props.item.endTime).format("YYYY-MM-DD"),
	};
});

// 使用说明
const doc = computed(() => {
	const { type, condition } = props.item || {};

	switch (type) {
		case 0:
			return `满${condition.fullAmount}可用`;
	}
});

const isExpand = ref(false);

function toRule() {
	isExpand.value = !isExpand.value;
}

// 去使用
function toUse() {
	if (!props.selectable) {
		router.push("/pages/index/goods");
	}
}
</script>

<style lang="scss" scoped>
.coupon-item {
	position: relative;
	margin-bottom: 24rpx;
	overflow: hidden;
	background-color: #fff;
	border-radius: 24rpx;

	.info {
		display: flex;
		padding: 50rpx 0;

		.a {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			height: 100%;
			width: 180rpx;
			margin-left: 10rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			.amount {
				font-size: 56rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
				line-height: 1;
				color: red;

				&::before {
					content: "￥";
					font-size: 32rpx;
					position: relative;
					top: -1rpx;
					font-weight: normal;
				}
			}

			.doc {
				font-size: 22rpx;
				color: #999;
			}
		}

		.b {
			display: flex;
			flex-direction: column;
			flex: 1;
			position: relative;
			padding: 0 20rpx;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
				letter-spacing: 1rpx;
			}

			.time {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.op {
		padding: 24rpx;
		border-top: 1rpx solid #eee;

		.inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 32rpx;
				width: 32rpx;
				border-radius: 32rpx;
				background-color: #f7f7f7;
				font-size: 22rpx;
				margin-left: 12rpx;
				transition: all 0.2s;
				transform: rotate(180deg);
				color: #999;

				&.expand {
					transform: rotate(0);
				}
			}

			&::after,
			&:before {
				display: block;
				content: "";
				height: 20rpx;
				width: 20rpx;
				background-color: $cl-color-bg;
				border-radius: 12rpx;
				position: absolute;
				top: -34rpx;
			}

			&::before {
				left: -34rpx;
			}

			&::after {
				right: -34rpx;
			}
		}

		.content {
			font-size: 24rpx;
			line-height: 36rpx;
			color: #666;
			margin-top: 24rpx;

			text {
				display: block;
			}
		}
	}

	&.is-disabled {
		opacity: 0.7;
	}

	&.is-border {
		border: 1rpx solid #eee;

		.op {
			.inner {
				&::before,
				&::after {
					display: none;
				}
			}
		}
	}
}
</style>
