<template>
	<view class="banner">
		<cl-banner
			:model-value="active"
			height="100%"
			:list="list"
			@transition="onTransition"
			@animationfinish="onAnimationFinish"
		>
			<template #item="{ item }">
				<view class="item">
					<view class="info">
						<text class="t1">{{ item.title }}</text>
						<text class="t2">{{ item.description }}</text>

						<cl-button
							type="primary"
							:margin="[40, 0, 0, 0]"
							@tap="toPath(item.path)"
							v-if="item.path"
						>
							立即下单
						</cl-button>
					</view>
				</view>
			</template>
		</cl-banner>

		<view class="pics">
			<template v-for="(item, index) in list" :key="item.url">
				<image
					:src="item.pic"
					:class="{
						show: active == index,
					}"
					:style="{
						opacity,
					}"
					v-if="active == index"
				/>
			</template>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";
import { onMounted } from "vue";

const { windowWidth } = uni.getSystemInfoSync();
const { service, router } = useCool();

const active = ref(0);

const list = ref<Eps.InfoBannerEntity[]>([]);

const opacity = ref(1);

function onTransition(e: any) {
	opacity.value = 1 - Math.abs(e.detail.dx) / (windowWidth / 2);
}

function onAnimationFinish(e: any) {
	active.value = e.detail.current;
	opacity.value = 1;
}

function refresh() {
	service.info.banner.list({ type: 1 }).then((res) => {
		list.value = res;
	});
}

function toPath(path: string) {
	if (path) {
		router.push(path);
	}
}

onMounted(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.banner {
	height: 500rpx;
	position: relative;

	.pics {
		image {
			position: absolute;
			left: 0;
			bottom: 24rpx;
			pointer-events: none;
			height: 350rpx;
			width: 350rpx;
			opacity: 0;
			transition: all 0.2s;

			&.show {
				opacity: 1;
			}
		}
	}

	.item {
		height: 100%;
		position: relative;

		.info {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			position: absolute;
			right: 48rpx;
			top: 150rpx;

			text {
				text-align: right;
			}

			.t1 {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.t2 {
				font-size: 22rpx;
				line-height: 40rpx;
			}
		}
	}
}
</style>
