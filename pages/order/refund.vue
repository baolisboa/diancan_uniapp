<template>
	<cl-page>
		<view class="page">
			<view class="card">
				<cl-list-item label="申请原因" :arrow-icon="false" :margin="[0, -20, 0, 0]">
					<cl-select-popup
						v-model="form.reason"
						:border="false"
						:options="list"
						title="选择申请原因"
					/>
				</cl-list-item>

				<cl-list-item label="优惠券" :arrow-icon="false">
					<cl-text :size="28" color="error">-</cl-text>
					<cl-text :size="28" type="price" color="error" :value="info?.discountPrice" />
				</cl-list-item>

				<cl-list-item label="退款金额" :arrow-icon="false">
					<cl-text type="price" :size="40" color="error" :value="refundAmount || 0" />
				</cl-list-item>
			</view>

			<view class="goods">
				<view class="item" v-for="(item, index) in info?.goodsList" :key="index">
					<goods-item :item="item.goodsInfo" :padding="0" :show-tags="false">
						<template #num>
							<cl-text color="info">x{{ item.count }}</cl-text>
						</template>
					</goods-item>
				</view>
			</view>
		</view>

		<cl-footer>
			<cl-button custom type="primary" :loading="loading" @tap="submit">提交</cl-button>
		</cl-footer>
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { onReady } from "@dcloudio/uni-app";
import { useUi } from "/$/cool-ui";
import GoodsItem from "/@/components/goods/item.vue";

const { service, router } = useCool();
const ui = useUi();
const { dict } = useStore();

// 表单
const form = reactive({
	reason: "",
});

// 提交中
const loading = ref(false);

// 订单信息
const info = ref<Eps.OrderInfoEntity>();

// 退款金额
const refundAmount = computed(() => {
	return Number(
		(Number(info.value?.price || 0) - Number(info.value?.discountPrice || 0)).toFixed(2),
	);
});

// 原因列表
const list = computed(() => {
	return dict.get("orderRefundReason").map((e) => {
		return {
			label: e.label,
			value: e.label,
		};
	});
});

// 获取订单信息
async function refresh() {
	ui.showLoading();

	await service.order.info
		.info({
			id: router.query.orderId,
		})
		.then((res) => {
			info.value = res;
		})
		.catch((err) => {
			ui.showTips(err.message, () => {
				router.back();
			});
		});

	ui.hideLoading();
}

// 提交
async function submit() {
	if (!form.reason) {
		return ui.showToast("请选择申请原因");
	}

	loading.value = true;

	await service.order.info
		.refund({
			orderId: router.query.orderId,
			reason: form.reason,
		})
		.then(() => {
			ui.showTips("退款申请提交成功，等待商家处理", () => {
				router.back();
			});
		})
		.catch((err) => {
			ui.showToast(err.message);
		});

	loading.value = false;
}

onReady(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx;

	.goods {
		padding: 24rpx;
		background-color: #fff;
		border-radius: 24rpx;

		.item {
			margin-bottom: 24rpx;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
