<template>
	<view class="select-shop" @tap="open()" v-if="showPicker">
		<shop-item :item="data || buy.shop">
			<template #icon>
				<text class="cl-icon-arrow-right" v-if="!disabled"></text>
			</template>
		</shop-item>
	</view>

	<cl-popup
		v-model="visible"
		direction="bottom"
		show-close-btn
		:border-radius="[32, 32, 0, 0]"
		:padding="0"
		:z-index="800"
	>
		<view class="select-shop__popup">
			<cl-text :size="30" block bold :margin="[30, 0, 30, 30]">选择门店</cl-text>

			<cl-loading-mask :loading="loading">
				<scroll-view scroll-y class="scroller">
					<view class="list">
						<view
							class="item"
							v-for="item in list"
							:key="item.id"
							:class="{
								'is-active': item.id == buy.shop?.id,
							}"
							@tap="select(item)"
						>
							<shop-item :item="item">
								<template #icon>
									<text class="cl-icon-check-border"></text>
								</template>
							</shop-item>
						</view>
					</view>

					<cl-empty icon="comm" :fixed="false" text="暂无门店" v-if="isEmpty(list)" />
				</scroll-view>
			</cl-loading-mask>
		</view>
	</cl-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBuy } from "/@/hooks";
import { useCool } from "/@/cool";
import { isEmpty } from "lodash-es";
import ShopItem from "./item.vue";

const props = defineProps({
	disabled: Boolean,
	data: Object,
	showPicker: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["select"]);

const { service } = useCool();
const buy = useBuy();

const visible = ref(false);
const loading = ref(false);

// 店铺列表
const list = ref<Eps.ShopInfoEntity[]>([]);

// 获取地址
async function refresh() {
	loading.value = true;

	await service.shop.info.list().then((res) => {
		list.value = res;
	});

	loading.value = false;
}

function select(item: Eps.ShopInfoEntity) {
	buy.selectShop(item);
	close();
	emit("select", item);
}

function open() {
	refresh();

	if (!props.disabled) {
		visible.value = true;
	}
}

function close() {
	visible.value = false;
}

defineExpose({
	open,
	close,
});
</script>

<style lang="scss" scoped>
.select-shop {
	margin-bottom: 24rpx;

	&__popup {
		.scroller {
			height: 50vh;

			.list {
				padding: 0 32rpx;

				.item {
					border: 2rpx solid #f7f7f7;
					border-radius: 24rpx;
					margin-bottom: 24rpx;

					.cl-icon-check-border {
						display: none;
						color: $cl-color-primary;
						font-size: 46rpx;
					}

					&.is-active {
						border-color: $cl-color-primary;

						.cl-icon-check-border {
							display: block;
						}
					}

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
}
</style>
