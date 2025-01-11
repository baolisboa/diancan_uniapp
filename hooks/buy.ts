import { defineStore } from "pinia";
import { ref } from "vue";
import { service, storage } from "/@/cool";
import { useMap } from "./map";
import { orderBy } from "lodash-es";

export const useBuy = defineStore("buy", () => {
	const map = useMap();
	const data = storage.info();

	const type = ref(data["buy.type"] || 0);

	const typeList = ref([
		{
			label: "自取",
			value: 0,
		},
		{
			label: "外卖",
			value: 1,
		},
	]);

	function selectType(val: number) {
		type.value = val;
		storage.set("buy.type", val);
	}

	const shop = ref<Eps.ShopInfoEntity | null>(data["buy.shop"]);

	function selectShop(data: any) {
		shop.value = data;
		storage.set("buy.shop", data);
	}

	function clearShop() {
		shop.value = null;
		storage.set("buy.shop", null);
	}

	async function defaultShop() {
		if (!shop.value) {
			let list = await service.shop.info.list();

			list = orderBy(
				list.map((e) => {
					e.distance = map.getDistance(e.lng, e.lat);
					return e;
				}),
				"distance",
				"asc",
			);

			selectShop(list[0]);
		}
	}

	return {
		type,
		typeList,
		selectType,
		shop,
		selectShop,
		clearShop,
		defaultShop,
	};
});
