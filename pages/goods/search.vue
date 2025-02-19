<template>
	<cl-page background-color="#fff">
		<cl-search
			v-model="keyWord"
			placeholder="想点什么搜一搜"
			:show-search-button="false"
			@search="toSearch(keyWord)"
		>
			<template #append>
				<cl-text :margin="[0, 10, 0, 20]">取消</cl-text>
			</template>
		</cl-search>

		<view class="page">
			<view class="history">
				<view class="head">
					<text class="label">搜索历史</text>
					<cl-icon class-name="shop-icon-delete" :size="36" @tap="history.clear()" />
				</view>

				<view class="list">
					<text
						class="item"
						v-for="(item, index) in history.list"
						:key="index"
						@tap="toSearch(item)"
					>
						{{ item }}
					</text>

					<text class="item" v-if="isEmpty(history.list)">无</text>
				</view>
			</view>

			<view class="search">
				<view class="head">
					<text class="label">搜索发现</text>
				</view>

				<view class="list">
					<text
						class="item"
						v-for="(item, index) in recommend.list"
						:key="index"
						@tap="toSearch(item.name!)"
					>
						{{ item.name }}
					</text>
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { storage, useCool } from "/@/cool";
import { isEmpty } from "lodash-es";
import { onReady } from "@dcloudio/uni-app";
import { useUi } from "/$/cool-ui";

const { router, service } = useCool();
const ui = useUi();

// 搜索关键字
const keyWord = ref("");

// 搜索历史
const history = reactive({
	list: (storage.get("search.history") || []) as string[],

	add() {
		if (!keyWord.value || history.list.includes(keyWord.value)) {
			return false;
		}

		history.list.push(keyWord.value);
		history.update();
	},

	clear() {
		ui.showConfirm({
			title: "提示",
			message: "确定要清空搜索历史吗？",
			callback(action) {
				if (action == "confirm") {
					history.list = [];
					history.update();
				}
			},
		});
	},

	update() {
		storage.set("search.history", history.list);
	},
});

// 推荐
const recommend = reactive({
	list: [] as Eps.GoodsSearchKeywordEntity[],

	get() {
		service.goods.searchKeyword.list().then((res) => {
			recommend.list = res;
		});
	},
});

// 搜索
function toSearch(val: string) {
	history.add();

	router.push({
		path: "/pages/goods/list",
		query: {
			keyWord: val,
		},
		mode: "redirectTo",
	});
}

onReady(() => {
	recommend.get();
});
</script>

<style lang="scss" scoped>
.page {
	.history,
	.search {
		padding: 0 24rpx;
		margin-bottom: 24rpx;

		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;

			.label {
				display: inline-block;
				font-size: 28rpx;
				font-weight: bold;
			}
		}

		.list {
			.item {
				display: inline-flex;
				align-items: center;
				height: 60rpx;
				padding: 0 24rpx;
				margin: 0 24rpx 24rpx 0;
				font-size: 24rpx;
				border-radius: 12rpx;
				background-color: #f1f1f1;
			}
		}
	}
}
</style>
