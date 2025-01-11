<template>
	<cl-page background-color="#fff">
		<view class="page" v-if="vip">
			<cl-text block bold :size="28" :margin="[32, 0, 60, 32]"
				>Lv{{ user.info?.level }} {{ vip?.name }}</cl-text
			>

			<view class="lv">
				<view
					class="item"
					v-for="(item, index) in list"
					:key="index"
					:class="{
						active: user.info?.level! >= item.level!,
					}"
				>
					<text class="name">{{ item.score }}</text>
					<text class="dot"></text>
					<text class="num">V{{ item.level }}</text>
				</view>

				<view class="line" :style="lineStyle">
					<view
						class="inner"
						:style="{
							width: score.all + '%',
						}"
					></view>
				</view>
			</view>

			<view class="card">
				<cl-banner
					v-model="tab"
					:list="list"
					type="card"
					transform="scale(0.9,0.8)"
					:circular="false"
				>
					<template #item="{ item }">
						<view
							class="item"
							:class="{
								active: item.level == user.info?.level,
							}"
						>
							<cl-text bold color="#000" :size="32" block>{{ item.name }}</cl-text>

							<view class="num">
								<template v-if="item.level == user.info?.level">
									<cl-row type="flex">
										<cl-text
											bold
											color="#000"
											:size="42"
											:margin="[0, 12, 0, 0]"
										>
											{{ user.info?.score }}
										</cl-text>
										<cl-text :size="28">成长值</cl-text>
									</cl-row>

									<div class="val">
										<cl-progress
											:show-text="false"
											un-color="#fff"
											:stroke-width="10"
											:value="score.current"
										/>
									</div>

									<cl-text :size="22" color="#666"
										>距离下一级还差{{ score.diff }}成长值</cl-text
									>
								</template>

								<template v-else>
									<cl-row type="flex">
										<cl-text
											bold
											color="info"
											:size="42"
											:margin="[0, 12, 0, 0]"
										>
											{{ item.score }}
										</cl-text>
										<cl-text color="info" :size="28">解锁</cl-text>
									</cl-row>
								</template>
							</view>
						</view>
					</template>
				</cl-banner>
			</view>

			<view class="detail">
				<cl-text :size="30" bold block :margin="[0, 0, 30, 0]">会员权益</cl-text>

				<text class="desc">
					{{ tabVip?.desc }}
				</text>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { useCool, useStore } from "/@/cool";
import { ref } from "vue";
import { computed } from "vue";
import { isEmpty } from "../../cool/utils/comm";
import { useUi } from "/$/cool-ui";

const { service, router } = useCool();
const { user } = useStore();
const ui = useUi();

const list = ref<Eps.UserVipEntity[]>([]);

// 会员选项卡
const tab = ref(0);
const tabVip = computed(() => {
	return list.value[tab.value];
});

// 进度
const lineStyle = computed(() => {
	const v = 100 / list.value.length / 2;

	return {
		left: v + "%",
		width: `calc(100% - ${v * 2}%)`,
	};
});

// 当前等级信息
const vip = computed(() => {
	return list.value.find((e) => e.level == user.info?.level);
});

// 积分计算
const score = computed(() => {
	if (isEmpty(list.value)) {
		return {
			all: 0,
			current: 0,
		};
	}

	const userLevel = user.info?.level || 1;
	const userScore = user.info?.score || 0;

	const next = list.value.find((e) => e.level == userLevel + 1);

	if (!next) {
		return {
			all: 100,
			current: 100,
			diff: 0,
		};
	}

	const step = 100 / (list.value.length - 1);

	return {
		current: (userScore / next.score!) * 100,
		all: (userScore / next.score! + userLevel - 1) * step,
		diff: next.score! - userScore,
	};
});

async function refresh() {
	ui.showLoading();
	await user.get();
	tab.value = (user.info?.level || 1) - 1;
	list.value = await service.user.vip.list({ order: "level", sort: "asc" });
	ui.hideLoading();
}

onReady(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page {
	.lv {
		display: flex;
		align-items: center;
		position: relative;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 1;

			text {
				display: block;
				font-size: 22rpx;
				text-align: center;
			}

			.name {
				color: $cl-color-info;
			}

			.dot {
				height: 20rpx;
				width: 20rpx;
				border-radius: 20rpx;
				background-color: #eee;
				margin: 20rpx 0;
				position: relative;
				z-index: 2;
			}

			&.active {
				.dot {
					background-color: $cl-color-primary;
				}

				text {
					color: $cl-color-primary;
					font-weight: bold;
				}
			}
		}

		.line {
			height: 6rpx;
			position: absolute;
			background-color: #eee;
			border-radius: 6rpx;

			.inner {
				position: absolute;
				left: 0;
				height: inherit;
				width: 100rpx;
				border-radius: inherit;
				background-color: $cl-color-primary;
			}
		}
	}

	.card {
		margin-top: 50rpx;

		.item {
			background: linear-gradient(-160deg, #fefefe, #eee);
			border-radius: 24rpx;
			padding: 32rpx;
			box-sizing: border-box;
			position: relative;
			border: 1rpx solid transparent;
			height: 100%;

			.num {
				position: absolute;
				left: 32rpx;
				bottom: 32rpx;
			}

			.val {
				width: 400rpx;
				margin-top: 10rpx;
			}

			&.active {
				border-color: $cl-color-primary;
				background: #fff;

				&::after {
					display: block;
					content: "当前等级";
					position: absolute;
					right: 0;
					top: 0;
					font-size: 22rpx;
					background-color: $cl-color-primary;
					color: #fff;
					border-radius: 0 24rpx 0 24rpx;
					height: 50rpx;
					line-height: 50rpx;
					padding: 0 20rpx;
				}
			}
		}
	}

	.detail {
		padding: 60rpx 32rpx 32rpx 32rpx;

		.desc {
			display: block;
			font-size: 26rpx;
			color: #666;
			line-height: 40rpx;
			padding: 0 10rpx;
		}
	}
}
</style>
