import { defineStore, acceptHMRUpdate } from "pinia";
import type { Ref } from "vue";

export const useElectricAccount = defineStore("electricAccount", () => {
	const supabase = useSupabaseClient();

	const loaded: Ref<boolean> = ref(false);
	const electricAccount = ref(null);

	function reset() {
		electricAccount.value = null;
		loaded.value = false;
		if (!process.server) {
			document.cookie = "electricBill=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	return {
		loaded,
		electricAccount,
		reset,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useElectricAccount, import.meta.hot));
}
