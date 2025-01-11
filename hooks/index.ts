import { defineStore } from "pinia";
import { ref } from "vue";
import { service } from "/@/cool";

export const useAddress = defineStore("address", () => {
	const info = ref<Eps.UserAddressEntity>();

	function set(data: Eps.UserAddressEntity) {
		info.value = data;
	}

	function clear() {
		info.value = undefined;
	}

	function getDefault() {
		if (!info.value || info.value?.isDefault) {
			service.user.address.default().then((res) => {
				info.value = res;
			});
		}
	}

	return {
		info,
		set,
		clear,
		getDefault,
	};
});

export * from "./buy";
export * from "./order";
export * from "./sp-cart";
export * from "./map";
