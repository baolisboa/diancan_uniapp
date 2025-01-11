import { defineStore } from "pinia";
import { ref } from "vue";

export const useMap = defineStore("map", () => {
	const lng = ref();
	const lat = ref();

	async function getLocation() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: "gcj02",
				success(res) {
					lat.value = res.latitude;
					lng.value = res.longitude;

					resolve({
						lat: lat.value,
						lng: lng.value,
					});
				},
				fail(err) {
					console.error(err);
					reject(err);
				},
			});
		});
	}

	function getDistance(lon1: number, lat1: number): number {
		if (!lat1 || !lat.value) {
			return 0;
		}

		const toRadians = (degree: number) => degree * (Math.PI / 180);

		const R = 6371;
		const dLat = toRadians(lat.value - lat1);
		const dLon = toRadians(lng.value - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat.value)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return parseFloat(distance.toFixed(2));
	}

	return {
		lng,
		lat,
		getLocation,
		getDistance,
	};
});
