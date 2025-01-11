import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { storage } from "/@/cool";
import { cloneDeep, isEmpty, values } from "lodash-es";
import { uuid } from "/@/cool/utils";

export const useSpCart = defineStore("spCart", () => {
	const list = ref<GoodsInfo[]>(storage.get("spCart") || []);

	// 数量
	const num = computed(() => list.value.length);

	// 金额
	const amount = computed(() => {
		return list.value.reduce((a, b) => {
			return a + Number(b.price || 0) * (b.count || 1);
		}, 0);
	});

	function find(data: any) {
		const index = list.value.findIndex(
			(e) => e.id == data.id && (e.spec ? getSpec(e.spec) == getSpec(data.spec) : true),
		);

		return {
			item: list.value[index],
			index,
		};
	}

	function add(data: any) {
		const { item } = find(data);

		if (item) {
			if (!data.count) {
				data.count = 1;
			}

			if (data.spec) {
				item.count! += data.count;
			} else {
				item.count = data.count;
			}

			if (item.count! > 100) {
				item.count = 100;
			}
		} else {
			list.value.push(
				cloneDeep({
					uid: uuid(),
					...data,
					price: getPrice(data),
				}),
			);
		}
	}

	function remove(data: any) {
		const { index } = find(data);
		list.value.splice(index, 1);

		if (isEmpty(list.value)) {
			uni.$emit("spec.close");
		}
	}

	function clear() {
		list.value = [];
	}

	function getSpec(data: any) {
		return values(data).filter(Boolean).join("、");
	}

	function getPrice(data: GoodsInfo) {
		let price = Number(data.price || 0);

		if (data.spec) {
			for (const i in data.spec) {
				const row = data?.specs?.find((e) => e.label == i);

				if (row) {
					const item = row.options.find((e) => e.label == data.spec?.[i]);

					if (item) {
						price += Number(item.price || 0);
					}
				}
			}
		}

		return price;
	}

	watch(
		list,
		(val) => {
			storage.set("spCart", val);
		},
		{
			deep: true,
		},
	);

	return {
		num,
		amount,
		list,
		add,
		remove,
		clear,
		getSpec,
		getPrice,
	};
});
