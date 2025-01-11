<template>
	<view
		class="goods-item"
		:style="{
			padding: parseRpx(padding),
		}"
		v-if="item"
	>
		<view class="cover">
			<image class="pic" :src="item?.mainPic" mode="aspectFill" />
		</view>

		<view class="det">
			<cl-text block bold :size="28" :margin="[0, 0, 12, 0]">{{ item?.title }}</cl-text>

			<cl-row v-if="!isEmpty(item?.tags) && showTags">
				<cl-tag
					size="small"
					v-for="tag in item?.tags"
					:key="tag"
					plain
					:margin="[0, 10, 10, 0]"
				>
					{{ dict.getLabel("goodsRecommendTags", tag) }}
				</cl-tag>
			</cl-row>

			<cl-text
				block
				:line-height="1.4"
				:size="22"
				:margin="[6, 0, 10, 0]"
				color="#999"
				v-if="specText"
			>
				{{ specText }}
			</cl-text>

			<cl-text
				block
				:line-height="1.4"
				:size="22"
				:margin="[6, 0, 10, 0]"
				color="#999"
				v-else
			>
				{{ item?.desc }}
			</cl-text>

			<view class="flex1"></view>

			<cl-row :margin="[10, 0, 0, 0]" type="flex" justify="space-between">
				<cl-text type="price" :size="32" :value="price || item?.price" bold color="red" />

				<slot name="num" :item="item">
					<cl-button
						size="small"
						type="primary"
						round
						@tap="add(item)"
						v-if="!isEmpty(item?.specs)"
					>
						选规格
					</cl-button>

					<cl-input-number
						v-model="item.count"
						:show-minus="!!item.count"
						:show-value="!!item.count"
						@change="onNumChange(item)"
						v-else
					/>
				</slot>
			</cl-row>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import { useStore } from "/@/cool";
import { type PropType, computed } from "vue";
import { useSpCart } from "/@/hooks";
import { parseRpx } from "/@/cool/utils";

const props = defineProps({
	item: Object as PropType<GoodsInfo>,
	showTags: {
		type: Boolean,
		default: true,
	},
	price: Number,
	padding: {
		type: null,
		default: 24,
	},
});

const { dict } = useStore();
const spCart = useSpCart();

const specText = computed(() => {
	return spCart.getSpec(props.item?.spec);
});

function add(item: Eps.GoodsInfoEntity) {
	uni.$emit("spec.open", item);
}

function onNumChange(item: GoodsInfo) {
	if (item.count == 0) {
		spCart.remove(item);
	} else {
		spCart.add(item);
	}
}
</script>

<style lang="scss" scoped>
.goods-item {
	display: flex;

	.cover {
		display: block;
		height: 160rpx;
		width: 160rpx;
		background-color: rgba($cl-color-primary, 0.05);
		border-radius: 16rpx;

		.pic {
			height: 100%;
			width: 100%;
			border-radius: inherit;
		}
	}

	.det {
		display: flex;
		flex-direction: column;
		padding: 8rpx 0 8rpx 24rpx;
		flex: 1;
	}
}
</style>
