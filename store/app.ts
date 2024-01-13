import { defineStore, acceptHMRUpdate } from "pinia";
import type { Ref } from "vue";

export const useApp = defineStore(
	"app",
	() => {
		const loaded: Ref<boolean> = ref(false);
		const locationLoaded: Ref<boolean> = ref(false);
		const location = ref(null);

		async function getLocation(): Promise<void> {
			try {
				const res = await $fetch("https://api.ipdata.co/?api-key=bd6873a58504e73b1db772ae8344272ad95e18ba91f7de57d0d8885e", {
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				});
				location.value = res;
				locationLoaded.value = false;
			} catch (error) {
				console.log(error);
			}
		}

		return {
			loaded,
			location,
			locationLoaded,
			getLocation,
		};
	},
	{
		persist: true,
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useApp, import.meta.hot));
}
