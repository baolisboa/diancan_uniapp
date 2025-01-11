<template>
	<cl-page>
		<view class="page">
			<view class="select">
				<view class="tab">
					<view
						class="item"
						v-for="item in tab.list"
						:key="item.value"
						:class="{
							active: item.value == buy.type,
						}"
						@tap="tab.change(item.value)"
					>
						{{ item.label }}
					</view>
				</view>

				<shop-select v-if="buy.type == 0" />
				<address-select v-if="buy.type == 1" />
			</view>

			<view class="card">
				<text class="label">价格明细</text>

				<goods-item
					v-for="(item, index) in spCart.list"
					:key="index"
					:item="item"
					:show-tags="false"
				>
					<template #num>
						<cl-text color="info">x{{ item.count }}</cl-text>
					</template>
				</goods-item>

				<cl-list-item label="优惠券">
					<coupon-select :totalAmount="totalAmount" :ref="setRefs('couponSelect')" />
				</cl-list-item>

				<cl-list-item label="合计" :arrow-icon="false">
					<cl-text :size="40" type="price" :value="paidAmount"></cl-text>
				</cl-list-item>
			</view>

			<view class="card">
				<cl-list-item label="预留电话" v-if="buy.type == 0" :arrow-icon="false">
					<cl-input
						v-model="form.phone"
						type="text"
						:border="false"
						align="right"
						:clearable="false"
						placeholder="选填，便于订单异常时联系"
						:maxlength="11"
						:width="400"
					/>

					<!-- #ifdef MP-WEIXIN -->
					<cl-button
						size="small"
						type="primary"
						plain
						open-type="getPhoneNumber"
						@getphonenumber="getPhone"
						>获取号码</cl-button
					>
					<!-- #endif -->
				</cl-list-item>

				<cl-list-item label="备注" @tap="refs.editRemark?.open">
					<cl-text color="info">口味、偏好等要求</cl-text>
				</cl-list-item>
			</view>
		</view>

		<cl-footer :flex="false" border :padding="24">
			<cl-row type="flex" justify="space-between">
				<cl-text type="price" color="error" :size="50" :value="paidAmount" />
				<cl-button type="primary" :width="200" :loading="loading" @tap="submit"
					>提交订单</cl-button
				>
			</cl-row>
		</cl-footer>

		<cl-popup
			:ref="setRefs('editRemark')"
			direction="bottom"
			:border-radius="[32, 32, 0, 0]"
			show-close-btn
		>
			<cl-text :size="30" bold block :margin="[0, 0, 32, 0]">备注</cl-text>

			<cl-textarea
				v-model="form.remark"
				placeholder="选填，付款后商家可见"
				background-color="#f7f7f7"
				:border="false"
				:margin="[0, 0, 100, 0]"
				count
				:height="220"
				:radius="16"
			/>

			<cl-button custom type="primary" @tap="refs.editRemark?.close">确认</cl-button>
		</cl-popup>
	</cl-page>
</template>

<script lang="ts" setup>
import { useCool, useStore, useWx } from "/@/cool";
import { computed, reactive, ref } from "vue";
import { useAddress, useBuy, useSpCart } from "/@/hooks";
import { useUi } from "/$/cool-ui";
import { useOrder } from "/@/hooks";
import AddressSelect from "/@/components/address/select.vue";
import ShopSelect from "/@/components/shop/select.vue";
import GoodsItem from "/@/components/goods/item.vue";
import CouponSelect from "/@/components/coupon/select.vue";

const { router, service, refs, setRefs } = useCool();
const address = useAddress();
const ui = useUi();
const spCart = useSpCart();
const order = useOrder();
const buy = useBuy();
const { user } = useStore();
const wx = useWx();

// 选项
const tab = reactive({
	list: [
		{
			label: "自取",
			value: 0,
		},
		{
			label: "外卖",
			value: 1,
		},
	],

	change(val: number) {
		buy.selectType(val);
	},
});

// 表单
const form = reactive({
	payType: "wxpay" as "wxpay" | "alipay",
	remark: "",
	phone: "",
});

// 提交中
const loading = ref(false);

// 总金额
const totalAmount = computed(() => {
	return spCart.amount || 0;
});

// 实付金额
const paidAmount = computed(() => {
	return totalAmount.value - (refs.couponSelect?.checked?.amount || 0);
});

// 提交
async function submit() {
	if (buy.type == 0) {
		if (!buy.shop?.id) {
			return ui.showToast("请选择配送门店");
		}
	} else {
		if (!address.info?.id) {
			return ui.showToast("请选择收货地址");
		}
	}

	loading.value = true;

	await service.order.info
		.create({
			data: {
				remark: form.remark,
				phone: form.phone,
				goodsList: spCart.list.map((e) => {
					e.goodsId = e.id;
					e.goodsInfo = { ...e };
					return {
						goodsId: e.id,
						goodsInfo: e,
						price: e.price,
						count: e.count,
						spec: spCart.getSpec(e.spec),
					};
				}),
				couponId: refs.couponSelect?.checked?.id,
				addressId: buy.type == 1 ? address.info?.id : null,
				shopId: buy.shop?.id,
				type: buy.type,
				title: "购买商品",
			},
		})
		.then(async (res) => {
			// 跳转订单详情
			function next() {
				// 删除购物车
				spCart.clear();

				router.push({
					path: "/pages/order/detail",
					query: {
						id: res.id,
					},
					mode: "redirectTo",
				});
			}

			await order
				.toPay(res.id)
				.then(() => {
					next();
				})
				.catch((err) => {
					ui.showTips(err.message, () => {
						next();
					});
				});
		})
		.catch((err) => {
			ui.showTips(err.message, () => {
				router.push({
					path: "/pages/order/list",
					mode: "redirectTo",
				});
			});
		});

	loading.value = false;
}

// 获取手机号
function getPhone(e: any) {
	if(e.detail.errMsg !== 'getPhoneNumber:ok') {
		return;
	}
	service.user.info
		.getMiniPhone({
			...e.detail,
			code: wx.code.value,
		})
		.then((res) => {
			form.phone = res;
		})
		.catch((err) => {
			ui.showTips(err.message);
			wx.getCode();
		});
}
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx;

	.pay-icon {
		height: 56rpx;
		width: 56rpx;
		position: absolute;
		right: 0;
		top: calc(50% - 28rpx);
	}

	.select {
		background-color: #fff;
		border-radius: 24rpx;
		overflow: hidden;
		margin-bottom: 24rpx;

		:deep(.select-shop),
		:deep(.select-address) {
			margin-bottom: 0;
		}

		.tab {
			display: flex;
			background-color: #f1f1f1;

			.item {
				flex: 1;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				border-radius: 24rpx 24rpx 0 0;

				&.active {
					background-color: #fff;
					color: $cl-color-primary;
				}
			}
		}
	}
}
</style>
