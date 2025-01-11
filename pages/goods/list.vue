<template>
	<cl-page background-color="#fff">
		<view class="page">
			<cl-sticky>
				<!-- 搜索栏 -->
				<cl-topbar :border="false" :show-back="false" :ref="setRefs('topbar')" with-mp>
					<cl-search
						v-model="keyWord"
						placeholder="搜索商品名称"
						@search="refresh({ page: 1 })"
					/>
				</cl-topbar>
			</cl-sticky>

			<!-- 商品列表 -->
			<view class="list">
				<goods-item :item="item" v-for="item in list" :key="item.id" />

				<cl-empty v-if="isEmpty(list)" />
			</view>
		</view>

		<!-- 规格 -->
		<goods-spec :ref="setRefs('goodsSpec')" />
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useCool } from "/@/cool";
import GoodsItem from "/@/components/goods/item.vue";
import GoodsSpec from "/@/components/goods/spec.vue";
import { isEmpty } from "lodash-es";

const { router, service, refs, setRefs } = useCool();

const keyWord = ref("");

const list = ref<Eps.GoodsInfoEntity[]>([]);

// 获取列表
async function refresh(params?: any) {
	list.value = await service.goods.info.list({
		...params,
		keyWord: keyWord.value,
	});
}

onReady(() => {
	keyWord.value = router.query.keyWord || "";
	refresh();
});

defineExpose({
	refresh,
});
</script>

<style lang="scss" scoped>
.page {
}
</style>
