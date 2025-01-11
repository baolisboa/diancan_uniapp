<template>
	<cl-popup v-model="visible" :padding="0" direction="bottom" show-close-btn :z-index="800">
		<view class="goods-spec" v-if="info">
			<scroll-view scroll-y class="scroller">
				<goods-item :item="info" :show-tags="false" :price="price">
					<template #num>
						<text></text>
					</template>
				</goods-item>

				<view class="spec" v-if="info.spec">
					<cl-form label-position="top">
						<cl-form-item
							:label="row.label"
							v-for="(row, index) in info.specs"
							:key="index"
						>
							<cl-radio-group fill border text v-model="info.spec[row.label]">
								<view class="fill">
									<cl-row :gutter="24">
										<cl-col
											:span="8"
											v-for="(item, index2) in row.options"
											:key="index2"
										>
											<cl-radio :radius="12" :label="item.label">
												<cl-row type="flex" justify="center">
													<cl-text>{{ item.label }}</cl-text>
													<cl-text v-if="item.price">
														￥{{ item.price }}
													</cl-text>
												</cl-row>
											</cl-radio>
										</cl-col>
									</cl-row>
								</view>
							</cl-radio-group>
						</cl-form-item>

						<cl-form-item label="数量">
							<cl-input-number v-model="info.count" :min="1" :max="99" />
						</cl-form-item>
					</cl-form>
				</view>
			</scroll-view>

			<cl-footer border :vt="[visible]">
				<cl-button type="primary" fill custom @tap="add">加入购物车</cl-button>
			</cl-footer>
		</view>
	</cl-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSpCart } from "/@/hooks";
import { useUi } from "/$/cool-ui";
import GoodsItem from "./item.vue";
import { cloneDeep } from "lodash-es";
import { computed } from "vue";
import { onHide, onShow } from "@dcloudio/uni-app";

const spCart = useSpCart();
const ui = useUi();

const visible = ref(false);

// 商品信息
const info = ref<GoodsInfo>();

// 规格价格
const price = computed(() => spCart.getPrice(info.value!));

function open(data: any) {
	visible.value = true;
	info.value = cloneDeep(data);

	if (info.value) {
		info.value.count = 1;
		info.value.spec = {};

		for (const d of info.value.specs!) {
			info.value.spec[d.label] = d.options[0]?.label;
		}
	}
}

function close() {
	visible.value = false;
}

function add() {
	spCart.add(info.value);

	ui.showToast("添加成功");
	close();
}

onShow(() => {
	uni.$on("spec.open", open);
});

onHide(() => {
	uni.$off("spec.open", open);
});

defineExpose({
	open,
	close,
});
</script>

<style lang="scss" scoped>
.goods-spec {
	.spec {
		padding: 32rpx;
	}

	.scroller {
		max-height: 70vh;
	}
}
</style>
