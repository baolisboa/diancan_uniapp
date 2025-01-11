<template>
	<cl-page background-color="#fff" status-bar-background="transparent" fullscreen>
		<view class="page">
			<cl-topbar :show-back="false" :border="false" background-color="transparent">
				<template #prepend>
					<view class="search" @tap="toSearch">
						<cl-icon name="search" :size="28" />
					</view>
				</template>
			</cl-topbar>

			<!-- 店铺 -->
			<shop />

			<!-- 推荐 -->
			<goods-recommend :ref="setRefs('recommend')" />

			<!-- 菜单 -->
			<view class="menu">
				<view class="menu-a">
					<scroll-view class="scroller" scroll-y>
						<view class="list">
							<view
								class="item"
								v-for="(item, index) in list"
								:key="index"
								:class="{
									'is-active': index == active,
									'is-prev': index == active - 1,
									'is-next': index == active + 1,
								}"
								@tap="toView(index)"
							>
								<text class="name">{{ item.name }}</text>
							</view>

							<view class="flex1"></view>
						</view>
					</scroll-view>
				</view>

				<view class="menu-b">
					<scroll-view
						class="scroller"
						scroll-y
						:scroll-into-view="view"
						scroll-with-animation
						enable-back-to-top
						@scroll="onScroll"
					>
						<view
							class="group"
							v-for="(group, index) in list"
							:key="index"
							:id="`group-${index}`"
						>
							<view class="label">
								{{ group.name }}
							</view>

							<view class="list">
								<goods-item
									v-for="item in group.children"
									:key="item.id"
									:item="item"
								/>

								<view class="empty" v-if="isEmpty(group.children)"> 暂无商品 </view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 结算 -->
			<settle />

			<!-- 规格 -->
			<goods-spec />
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { storage, useCool } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { ref, nextTick } from "vue";
import { isArray, isEmpty } from "lodash-es";
import { onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import Settle from "/@/components/goods/settle.vue";
import GoodsItem from "/@/components/goods/item.vue";
import GoodsSpec from "/@/components/goods/spec.vue";
import GoodsRecommend from "/@/components/goods/recommend.vue";
import Tabbar from "./components/tabbar.vue";
import Shop from "./components/shop.vue";
import { useBuy, useSpCart, useMap } from "/@/hooks";
import { watch } from "vue";
import { config } from "/@/config";

interface Item {
	name: string;
	top: number;
	children: Eps.GoodsInfoEntity[];
}

const { service, router, refs, setRefs } = useCool();
const ui = useUi();
const spCart = useSpCart();
const buy = useBuy();
const map = useMap();

const list = ref<Item[]>([]);
const view = ref("");
const active = ref(0);

// 获取列表
async function refresh() {
	ui.showLoading();

	const types = await service.goods.type.list();
	const goods = await service.goods.info.list();

	list.value = types.map((e) => {
		return {
			name: e.name!,
			top: 0,
			children: goods.filter((a) => a.typeId == e.id),
		};
	});

	await nextTick();

	updateNum();

	uni.createSelectorQuery()
		.selectAll(".group")
		.boundingClientRect((res) => {
			if (isArray(res)) {
				const a = res[0].top || 0;

				res.forEach((e, i) => {
					list.value[i].top = (e.top || 0) - a;
				});
			}
		})
		.exec();

	ui.hideLoading();
}

// 滚动时的锁
let lock: any;
function clearLock() {
	if (lock) {
		clearTimeout(lock);
		lock = null;
	}
}

// 监听滚动
function onScroll(e: { detail: { scrollTop: number } }) {
	if (!lock) {
		list.value?.find((a, i) => {
			if (e.detail.scrollTop >= a.top) {
				active.value = i;
			}
		});
	}

	if (e.detail.scrollTop > 100) {
		refs.recommend.hide();
	} else {
		refs.recommend.show();
	}
}

// 滚动到指定分类
function toView(index: number) {
	clearLock();

	active.value = index;
	view.value = `group-${index}`;

	lock = setTimeout(() => {
		clearLock();
	}, 500);
}

// 搜索
function toSearch() {
	router.push({
		path: "/pages/goods/search",
	});
}

// 初始化
async function init() {
	const { type } = router.params;

	if (type !== undefined) {
		buy.selectType(type || 0);
	}

	storage.remove("router-params");

	if (!map.lat) {
		map.getLocation()
			.then(() => {
				buy.defaultShop();
			})
			.catch(() => {
				ui.showConfirm({
					title: "地理位置未授权",
					message: `如需使用${config.app.name}，请开启手机中的定位权限`,
					confirmButtonText: "去授权",
					callback(action) {
						if (action == "confirm") {
							uni.openSetting();
						}
					},
				});
			});
	}
}

// 更新数量
function updateNum() {
	list.value.forEach((a) => {
		a.children.forEach((b) => {
			if (isEmpty(b.specs)) {
				const d = spCart.list.find((e) => e.id == b.id);

				if (d) {
					b.count = d.count;
				} else {
					b.count = 0;
				}
			}
		});
	});
}

// 同步数量
watch(() => spCart.list, updateNum, {
	deep: true,
});

onPullDownRefresh(async () => {
	await refresh();
	uni.stopPullDownRefresh();
});

onReady(() => {
	init();
	refresh();
});

onShow(() => {
	if (ui.loaded) {
		init();
		refresh();
	}
});
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	height: calc(100% - 120rpx);

	.search {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		width: 60rpx;
		background-color: #f7f7f7;
		border-radius: 60rpx;
		margin-left: 24rpx;
		color: #999;
	}

	.menu {
		display: flex;
		flex: 1;
		position: relative;
		background-color: #fff;
		overflow: hidden;

		.scroller {
			height: 100%;
		}

		.menu-a {
			width: 180rpx;
			flex-shrink: 0;
			overflow: hidden;
			border-radius: 0 24rpx 0 0;

			.scroller {
				width: 200rpx;
			}

			.list {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 180rpx;

				.flex1 {
					background-color: #f7f7f7;
					flex: 1;
					padding-bottom: 200rpx;
				}
			}

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				padding: 30rpx 0;
				font-size: 26rpx;
				position: relative;
				color: $cl-color-placeholder;
				background-color: #f7f7f7;

				.icon {
					height: 50rpx;
					width: 50rpx;
					margin-bottom: 10rpx;
				}

				.name {
					font-size: 24rpx;
				}

				&.is-active {
					background-color: #fff;
					color: $cl-color-primary;
					font-weight: 500;

					& + .flex1 {
						border-top-right-radius: 24rpx;
					}
				}

				&.is-prev {
					border-bottom-right-radius: 24rpx;
				}

				&.is-next {
					border-top-right-radius: 24rpx;
				}
			}
		}

		.menu-b {
			flex: 1;

			.group {
				.label {
					display: flex;
					align-items: center;
					color: #555;
					height: 60rpx;
					font-size: 28rpx;
					font-weight: 500;
					padding: 0 30rpx;
					padding-top: 20rpx;
				}

				.list {
					.empty {
						font-size: 24rpx;
						color: $cl-color-info;
						padding: 32rpx;
					}
				}

				&:last-child {
					padding-bottom: calc(env(safe-area-inset-bottom) + 164rpx);
				}
			}
		}
	}
}
</style>
