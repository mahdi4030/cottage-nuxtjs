import { defineStore, acceptHMRUpdate } from "pinia";
import type { Ref } from "vue";

export const useReferrals = defineStore("referrals", () => {
	const supabase = useSupabaseClient();

	const loaded: Ref<boolean> = ref(false);
	const referrals = ref(null);

	function reset() {
		referrals.value = null;
		loaded.value = false;
		if (!process.server) {
			document.cookie = "referrals=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	async function fetchReferrals(id: string): Promise<void> {
		const data = await $fetch("/api/referrals/get-referrals/" + id, {
			method: "get",
		});
		console.log(referrals);
		referrals.value = data;
	}

	async function createReferral(refferrer_id: string, referred_id: string): Promise<boolean> {
		const { error } = await supabase.from("Referrals").insert({
			referredBy: refferrer_id,
			referred: referred_id,
		});
		if (error) throw error;
		return true;
	}

	return {
		loaded,
		referrals,
		reset,
		fetchReferrals,
		createReferral,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useReferrals, import.meta.hot));
}
