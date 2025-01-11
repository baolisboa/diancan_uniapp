<template>
	<cl-page>
		<view class="page">
			<cl-sticky :top="0">
				<cl-tabs
					v-model="status.active"
					:height="100"
					:list="status.list"
					fill
					:border="false"
					@change="onTabChange"
				/>
			</cl-sticky>

			<view class="list">
				<view class="item" v-for="item in list" :key="item.id" @tap="toDetail(item)">
					<view class="head">
						<cl-row>
							<cl-row type="flex">
								<cl-tag size="small" type="success" v-if="item.type == 0"
									>自取</cl-tag
								>
								<cl-tag size="small" type="error" v-else>外卖</cl-tag>

								<cl-text :size="28" bold :margin="[0, 0, 0, 10]">
									{{ item.shopName }}
								</cl-text>
							</cl-row>

							<cl-text :margin="[14, 0, 0, 0]" :size="22" color="info" block>{{
								item.createTime
							}}</cl-text>
						</cl-row>

						<view class="flex1"></view>

						<order-status :status="item.status" />
					</view>

					<view class="info">
						<!-- 单个 -->
						<view class="goods" v-if="item.goodsList.length == 1">
							<image
								class="cover"
								:src="item.goodsList[0].goodsInfo.mainPic"
								mode="aspectFill"
							/>

							<view class="det">
								<cl-text :size="28" block :margin="[0, 0, 6, 0]">{{
									item.goodsList[0].goodsInfo.title
								}}</cl-text>
								<cl-text :size="24" color="info" :ellipsis="1">
									{{ item.goodsList[0].spec }}
								</cl-text>
							</view>
						</view>

						<!-- 多个 -->
						<view class="goods2" v-else>
							<scroll-view class="scroller" scroll-x>
								<view class="ul">
									<view class="li" v-for="goods in item.goodsList">
										<image :src="goods.goodsInfo.mainPic" mode="aspectFill" />
										<cl-text align="center" :size="22" block :ellipsis="1">{{
											goods.goodsInfo.title
										}}</cl-text>
									</view>
								</view>
							</scroll-view>
						</view>

						<view class="count">
							<cl-text
								:margin="[0, 0, 10, 0]"
								block
								bold
								type="price"
								:size="36"
								:value="item.price"
							/>
							<cl-text color="info" :size="22">
								共{{ item.goodsList.length }}件
							</cl-text>
						</view>
					</view>

					<view class="op">
						<cl-button>订单详情</cl-button>
					</view>
				</view>

				<cl-empty v-if="isEmpty(list)" />
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { useCool, usePager } from "/@/cool";
import Tabbar from "./components/tabbar.vue";
import { onReady, onShow } from "@dcloudio/uni-app";
import { useUi } from "/$/cool-ui";
import { isEmpty } from "lodash-es";
import { reactive } from "vue";
import OrderStatus from "/@/components/order/status.vue";

const { service, router } = useCool();
const { onRefresh, list } = usePager<OrderInfo>();
const ui = useUi();

const status = reactive({
	active: 0,
	list: [
		{ label: "当前订单", value: 0 },
		{ label: "历史订单", value: 1 },
	],
});

function toDetail(item: any) {
	router.push({
		path: "/pages/order/detail",
		query: {
			id: item.id,
		},
	});
}

function refresh(params?: any) {
	const { data, next } = onRefresh(params);
	next(
		service.order.info.page({
			...data,
			status: status.active == 0 ? [0, 1, 2, 5] : [3, 4, 6, 7],
		}),
	);
}

function onTabChange() {
	refresh({ page: 1 });
}

onReady(() => {
	refresh();
});

onShow(() => {
	if (ui.loaded) {
		refresh();
	}
});

defineExpose({
	refresh,
});
</script>

<style lang="scss" scoped>
.page {
	.list {
		padding: 24rpx;

		.item {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 32rpx 24rpx;
			margin-bottom: 24rpx;

			.head {
				display: flex;
				align-items: flex-start;
				margin-bottom: 24rpx;
			}

			.info {
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;

				.goods {
					display: flex;
					align-items: center;
					flex: 1;

					.cover {
						height: 116rpx;
						width: 116rpx;
						border-radius: 12rpx;
						background-color: rgba($cl-color-primary, 0.05);
					}

					.det {
						margin: 0 24rpx;
						flex: 1;
					}
				}

				.goods2 {
					// width: calc(100% - 200rpx);
					height: 160rpx;
					flex: 1;
					overflow: hidden;

					.scroller {
						height: 180rpx;
						width: 100%;
					}

					.ul {
						display: flex;
					}

					.li {
						margin: 0 24rpx 0 0;

						image {
							display: block;
							height: 116rpx;
							width: 116rpx;
							border-radius: 12rpx;
							background-color: rgba($cl-color-primary, 0.05);
							margin-bottom: 14rpx;
						}
					}
				}

				.count {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					margin-left: 20rpx;
				}
			}

			.op {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
}
</style>
