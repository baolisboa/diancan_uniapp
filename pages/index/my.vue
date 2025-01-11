<template>
	<cl-page status-bar-background="transparent">
		<!-- #ifdef MP -->
		<cl-sticky>
			<cl-topbar :show-back="false" :border="false" background-color="transparent" />
		</cl-sticky>
		<!-- #endif -->

		<view class="page-my">
			<view class="header">
				<view class="icon" @tap="toEdit">
					<text class="cl-icon-edit"></text>
				</view>

				<view class="icon" @tap="toSet">
					<text class="cl-icon-set"></text>
				</view>

				<view class="icon" @tap="toMsg">
					<text class="cl-icon-msg"></text>
				</view>
			</view>

			<view class="user" @tap="toEdit">
				<cl-avatar :src="user.info?.avatarUrl" :size="100" />

				<view class="det">
					<cl-text :size="32" block :margin="[0, 0, 8, 0]">{{
						user.info?.nickName || "点击登录"
					}}</cl-text>

					<cl-tag round size="small"
						>Lv{{ user.info?.level || 1 }}{{ vip?.info?.name }}</cl-tag
					>
				</view>
			</view>

			<view class="count">
				<view class="item" @tap="router.push('/pages/user/vip')">
					<cl-text :size="24" block :margin="[0, 0, 14, 0]" color="#666">活力值</cl-text>
					<cl-text :size="34" bold>{{ user.info?.score || 0 }}</cl-text>

					<image src="/static/icon/vip.png" mode="aspectFill" />
				</view>

				<view class="item" @tap="router.push('/pages/market/coupon')">
					<cl-text :size="24" block :margin="[0, 0, 14, 0]" color="#666">优惠券</cl-text>
					<cl-text :size="34" bold>{{ count.coupon || 0 }}</cl-text>

					<image src="/static/icon/coupon.png" mode="aspectFill" />
				</view>
			</view>

			<view class="menu">
				<cl-list :radius="24" :border="false">
					<cl-list-item label="地址管理" @tap="router.push('/pages/user/address-list')">
						<template #icon>
							<cl-image src="/static/icon/location.png" :size="40" />
						</template>
					</cl-list-item>

					<cl-list-item
						label="意见反馈"
						@tap="router.push('/uni_modules/cool-app/pages/feedback/list')"
					>
						<template #icon>
							<cl-image src="/static/icon/edit.png" :size="40" />
						</template>
					</cl-list-item>

					<cl-list-item
						label="在线客服"
						@tap="router.push('/uni_modules/cool-cs/pages/chat')"
					>
						<template #icon>
							<cl-image src="/static/icon/cs.png" :size="40" />
						</template>
					</cl-list-item>
				</cl-list>

				<cl-list :radius="24" :border="false">
					<cl-list-item label="设置" @tap="toSet">
						<template #icon>
							<cl-image src="/static/icon/set.png" :size="40" />
						</template>
					</cl-list-item>
				</cl-list>
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { useCool, useStore, module } from "/@/cool";
import { useUi } from "/$/cool-ui";
import Tabbar from "./components/tabbar.vue";
import { reactive } from "vue";
import { ref } from "vue";

const { router, service } = useCool();
const { user } = useStore();
const ui = useUi();

// 数量
const count = reactive({
	coupon: 0,
});

// 会员
const vip = reactive({
	info: undefined as Eps.UserVipEntity | undefined,

	refresh() {
		service.user.vip.list({ order: "level", sort: "asc" }).then((res) => {
			const d = res.find((e) => e.level == user.info?.level);

			vip.info = d;
		});
	},
});

async function refresh() {
	if (user.token) {
		user.get();
		vip.refresh();

		// 我的优惠券
		service.market.coupon.user.my().then((res) => {
			count.coupon = res;
		});
	} else {
		// user.logout();
	}
}

function toSet() {
	router.push("/pages/user/set");
}

function toEdit() {
	router.push("/pages/user/edit");
}

function toMsg() {
	if (module.get("cool-msg")) {
		router.push("/uni_modules/cool-msg/pages/list");
	} else {
		ui.showToast("消息模块不存在，请在插件市场中下载");
	}
}

onPullDownRefresh(async () => {
	await refresh();
	uni.stopPullDownRefresh();
});

onShow(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
$gap: 24rpx;

.page-my {
	padding: $gap;

	.header {
		display: flex;

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			width: 60rpx;
			background-color: rgba(150, 150, 150, 0.1);
			border-radius: 16rpx;
			font-size: 32rpx;
			margin-right: $gap;

			&:last-child {
				margin-left: auto;
				margin-right: 0;
			}
		}
	}

	.user {
		display: flex;
		align-items: center;
		padding: 48rpx 12rpx;

		.det {
			flex: 1;
			margin-left: 32rpx;
		}
	}

	.count {
		display: flex;
		margin-bottom: 24rpx;

		.item {
			flex: 1;
			border-radius: 24rpx;
			padding: 32rpx;
			background-color: #fff;
			position: relative;

			image {
				position: absolute;
				right: 24rpx;
				top: calc(50% - 30rpx);
				height: 60rpx;
				width: 60rpx;
			}

			&:nth-child(1) {
				margin-right: 12rpx;
			}

			&:nth-child(2) {
				margin-left: 12rpx;
			}
		}
	}

	.status {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
		margin-bottom: 24rpx;

		.list {
			display: flex;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;
				padding: 48rpx 0 24rpx 0;
			}
		}
	}

	.menu {
		:deep(.cl-list-item) {
			padding: 4rpx 6rpx 4rpx 12rpx;
		}
	}
}
</style>
