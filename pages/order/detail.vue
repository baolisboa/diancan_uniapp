<template>
	<cl-page>
		<view class="page">
			<cl-card :label="info?.type == 0 ? '取餐号' : '配送地址'" more>
				<template #more>
					<order-status :status="info?.status" />
				</template>

				<template v-if="info?.type == 0">
					<cl-text
						:size="50"
						bold
						block
						:margin="[12, 0, 12, 0]"
						color="#000"
						:letter-spacing="2"
					>
						{{ info?.takeNum }}
					</cl-text>
				</template>

				<template v-else>
					<cl-text
						:size="32"
						:line-height="1.4"
						bold
						block
						:margin="[0, 0, 12, 0]"
						color="#000"
					>
						{{ info?.address?.address }} {{ info?.address?.detail }}
					</cl-text>

					<cl-row>
						<cl-text>
							{{ info?.address?.contact }}
						</cl-text>

						<cl-text :margin="[0, 0, 0, 24]">{{
							info?.phone || info?.address?.phone
						}}</cl-text>
					</cl-row>
				</template>
			</cl-card>

			<cl-card :label="info?.shop.name" more>
				<template #more>
					<cl-icon name="map-fill" @tap="openLocation"></cl-icon>
				</template>

				<view class="goods">
					<div class="item" v-for="(item, index) in info?.goodsList" :key="index">
						<goods-item :item="item.goodsInfo" :show-tags="false" :padding="0">
							<template #num>
								<cl-text color="info">x{{ item.count }}</cl-text>
							</template>
						</goods-item>
					</div>
				</view>

				<cl-list-item
					label="优惠金额"
					:arrow-icon="false"
					:margin="[0, -20, 0, -20]"
					@tap="showDiscount = !showDiscount"
				>
					<template #icon>
						<cl-icon class-name="shop-icon-coupon" :size="40" />
					</template>

					<cl-text :size="28" color="error">-</cl-text>
					<cl-text :size="28" type="price" color="error" :value="info?.discountPrice" />

					<cl-icon
						name="arrow-bottom"
						:margin="[0, 0, 0, 10]"
						:size="24"
						v-if="info?.discountSource"
					/>
				</cl-list-item>

				<!-- 优惠信息 -->
				<view class="discount-info" v-if="showDiscount && info?.discountSource">
					{{ info?.discountSource?.info.title }}：满
					{{ info?.discountSource?.info.condition?.fullAmount }} 元减
					{{ info?.discountSource?.info.amount }} 元
				</view>

				<view class="total">
					<cl-text :size="24">共</cl-text>
					<cl-text type="price" :size="34" :margin="[0, 0, 0, 8]" :value="paidAmount" />
				</view>
			</cl-card>

			<cl-card label="用餐信息">
				<view class="type">
					<view class="row">
						<text>用餐方式</text>
						<text>{{ dict.getLabel(OrderType, info?.type) }}</text>
					</view>

					<view class="row">
						<text>预留电话</text>
						<text>{{ info?.phone || "无" }}</text>
					</view>
				</view>
			</cl-card>

			<cl-card label="订单信息">
				<view class="order">
					<view class="row">
						<text>订单号</text>
						<text>{{ info?.orderNum }}</text>

						<cl-button size="small" :margin="[0, 0, 0, 10]" @tap="toCopy"
							>复制</cl-button
						>
					</view>

					<view class="row">
						<text>下单时间</text>
						<text>{{ info?.createTime }}</text>
					</view>

					<view class="row">
						<text>支付方式</text>
						<text>{{ dict.getLabel(PayType, info?.payType) }}</text>
					</view>

					<view class="row">
						<text>支付金额</text>
						<text>￥{{ paidAmount }}</text>
					</view>

					<view class="row">
						<text>备注</text>
						<text>{{ info?.remark || "无" }}</text>
					</view>
				</view>
			</cl-card>
		</view>

		<cl-footer :vt="[info?.status]">
			<template v-if="info?.status == 0">
				<cl-button custom @tap="refs.orderCancel?.open(info)">取消订单</cl-button>
				<cl-button custom type="success" @tap="toPay">继续支付</cl-button>
			</template>

			<template v-else-if="info?.status == 1">
				<cl-button custom type="info" @tap="toRefund">申请退款</cl-button>
			</template>

			<template v-else-if="info?.status == 2">
				<cl-button custom type="primary" @tap="toConfirm">确认送达</cl-button>
			</template>
		</cl-footer>

		<!-- 取消订单 -->
		<order-cancel :ref="setRefs('orderCancel')" />
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import { PayType, OrderType } from "/@/dict";
import GoodsItem from "/@/components/goods/item.vue";
import { useOrder } from "/@/hooks";
import OrderStatus from "/@/components/order/status.vue";
import OrderCancel from "./components/cancel.vue";
import { computed } from "vue";

const { service, router, refs, setRefs } = useCool();
const { dict } = useStore();
const ui = useUi();
const order = useOrder();

// 显示优惠信息
const showDiscount = ref(false);

// 订单详情
const info = ref<OrderInfo>();

// 实付金额
const paidAmount = computed(() => {
	return Number(
		(Number(info.value?.price || 0) - Number(info.value?.discountPrice || 0)).toFixed(2),
	);
});

// 获取订单详情
async function refresh() {
	ui.showLoading();

	await service.order.info
		.info({
			id: router.query.id,
		})
		.then((res) => {
			info.value = res as any;
		})
		.catch((err) => {
			ui.showTips(err.message, () => {
				router.back();
			});
		});

	ui.hideLoading();
}

// 复制订单号
function toCopy() {
	uni.setClipboardData({
		data: info.value?.orderNum!,
	});
}

// 打开地图
function openLocation() {
	const { lat, lng, name, address } = info.value?.shop || {};

	uni.openLocation({
		latitude: lat,
		longitude: lng,
		name,
		address,
	});
}

// 支付
function toPay() {
	order
		.toPay(info.value?.id!, "wxpay")
		.then(() => {
			ui.showToast("支付成功");
			refresh();
		})
		.catch((err) => {
			ui.showToast(err.message);
		});
}

// 申请退款
function toRefund() {
	router.push({
		path: "/pages/order/refund",
		query: {
			orderId: info.value?.id,
		},
	});
}

// 确认送达
function toConfirm() {
	ui.showConfirm({
		title: "确认餐已收到",
		message: "确认后无法发起退款等售后申请，请谨慎操作",
		async beforeClose(action, { done, hideLoading, showLoading }) {
			if (action == "confirm") {
				showLoading();

				await service.order.info
					.confirm({
						orderId: info.value?.id,
					})
					.then(() => {
						ui.showToast("确认成功");
						refresh();
					})
					.catch((err) => {
						ui.showToast(err.message);
					});

				hideLoading();
			}

			done();
		},
	});
}

onPullDownRefresh(async () => {
	await refresh();
	uni.stopPullDownRefresh();
});

onReady(() => {
	refresh();
});

onShow(() => {
	if (ui.loaded) {
		refresh();
	}
});
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx;

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		margin-bottom: 30rpx;

		& > text {
			&:first-child {
				color: $cl-color-info;
			}

			&:nth-child(2) {
				margin-left: auto;
			}
		}

		&:last-child {
			margin-bottom: 10rpx;
		}
	}

	.goods {
		.item {
			margin-bottom: 24rpx;
		}
	}

	.discount-info {
		background-color: $cl-color-bg;
		color: #444;
		padding: 12rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		text-align: right;
	}

	.total {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 50rpx;
	}
}
</style>
