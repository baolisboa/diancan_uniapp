<template>
	<cl-page status-bar-background="#f6f7fa">
		<view class="page">
			<banner />

			<view class="container">
				<view class="user">
					<cl-avatar :size="40" :margin="[0, 10, 0, 0]" :src="user.info?.avatarUrl" />

					<text class="name">{{ user.info?.nickName || "未登录" }}</text>

					<view class="flex1"></view>

					<text>优惠券 {{ coupon.num || 0 }}</text>

					<view class="hr"></view>

					<text>成长值 {{ user.info?.score || 0 }}</text>
				</view>

				<view class="action">
					<div class="item" @tap="toGoods(0)">
						<text>门店自取</text>
						<image src="/static/icon/action/shop.png" mode="aspectFill" />
					</div>

					<div class="item" @tap="toGoods(1)">
						<text>外卖点单</text>
						<image src="/static/icon/action/takeaway.png" mode="aspectFill" />
					</div>
				</view>

				<view class="menu">
					<cl-row :gutter="24">
						<cl-col :span="8" @tap="router.push('/pages/user/vip')">
							<view class="item">
								<image src="/static/icon/vip.png" mode="aspectFill" />
								<text>会员权益</text>
							</view>
						</cl-col>

						<cl-col :span="8" @tap="router.push('/pages/market/coupon')">
							<view class="item">
								<image src="/static/icon/coupon.png" mode="aspectFill" />
								<text>优惠券</text>
							</view>
						</cl-col>

						<cl-col :span="8">
							<button open-type="share" class="item">
								<image src="/static/icon/invite.png" mode="aspectFill" />
								<text>邀请好友</text>
							</button>
						</cl-col>
					</cl-row>
				</view>

				<view class="ad" v-if="coupon.info">
					<view class="inner">
						<text class="title">{{ coupon.info.title }}</text>
						<text class="desc">{{ coupon.info.description }}</text>
						<button class="btn" @tap="coupon.get">马上领取</button>
					</view>

					<image src="/static/ad.jpg" mode="widthFix" />
				</view>
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Banner from "./components/banner.vue";
import Tabbar from "./components/tabbar.vue";
import { useCool, useStore } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { onShow } from "@dcloudio/uni-app";

const { router, service } = useCool();
const { user } = useStore();
const ui = useUi();

function toGoods(type: number) {
	router.push({
		path: "/pages/index/goods",
		params: {
			type,
		},
	});
}

const coupon = reactive({
	info: null as Eps.MarketCouponInfoEntity | null,

	num: 0,

	get() {
		service.market.coupon.user
			.receive({
				couponId: coupon.info?.id,
			})
			.then(() => {
				ui.showToast("领取成功");
				coupon.refresh();
			})
			.catch((err) => {
				ui.showToast(err.message);
			});
	},

	refresh() {
		if (user.token) {
			service.market.coupon.user.my().then((res) => {
				coupon.num = res;
			});
		}

		service.market.coupon.info
			.page({ size: 1, page: 1, order: "createTime", sort: "asc" })
			.then((res) => {
				coupon.info = res.list[0];
			});
	},
});

onShow(() => {
	coupon.refresh();
});
</script>

<style lang="scss" scoped>
.page {
	.container {
		margin: 0 24rpx;
		padding-bottom: 24rpx;

		.user {
			display: flex;
			align-items: center;
			padding: 24rpx;
			background-color: #fff9;
			backdrop-filter: blur(10rpx);
			border-radius: 16rpx 16rpx 0 0;
			font-size: 24rpx;
			color: $cl-color-primary;

			.name {
				font-size: 28rpx;
			}

			.hr {
				height: 14rpx;
				width: 1rpx;
				background-color: $cl-color-primary;
				margin: 0 16rpx;
			}
		}

		.location {
			display: flex;
			align-items: center;
			padding: 24rpx;
			background-color: #fff;
		}

		.action {
			display: flex;
			padding: 48rpx 0 72rpx 0;
			background-color: #fff;
			border-radius: 0 0 16rpx 16rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;

				image {
					height: 100rpx;
					width: 100rpx;
					margin-top: 20rpx;
				}

				text {
					font-size: 28rpx;
					color: #666;
				}
			}
		}

		.menu {
			margin-top: 24rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				height: 150rpx;
				border-radius: 16rpx;
				border: 0;
				padding: 0;
				margin: 0;
				line-height: normal;

				image {
					height: 56rpx;
					width: 56rpx;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: #666;
				}

				&::after {
					border: 0;
				}
			}
		}

		.ad {
			margin-top: 24rpx;
			position: relative;

			.inner {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 100%;
				z-index: 2;
				color: #fff;
				padding: 24rpx;
				box-sizing: border-box;
				letter-spacing: 1rpx;

				text {
					display: block;
				}

				.title {
					font-size: 32rpx;
					font-weight: 500;
				}

				.desc {
					font-size: 26rpx;
					margin: 20rpx 0 0 0;
				}

				.btn {
					padding: 0;
					font-size: 24rpx;
					height: 65rpx;
					width: 200rpx;
					position: absolute;
					left: 24rpx;
					bottom: 28rpx;
					line-height: 65rpx;
					background-color: $cl-color-primary;
					color: #fff;
					border: 1rpx solid #418f02;

					&::after {
						border: 0;
					}
				}
			}

			image {
				display: block;
				width: 100%;
				border-radius: 24rpx;
			}
		}
	}
}
</style>
