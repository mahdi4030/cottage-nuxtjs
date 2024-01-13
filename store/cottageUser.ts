import { defineStore, acceptHMRUpdate } from "pinia";
import { CottageUsers } from "~~/types/Models";

function initCottageUser() {
	return {
		id: "",
		email: "",
		referralCode: "",
		cottageConnectUserType: null,
	} as CottageUsers;
}

export const useCottageUser = defineStore("cottageUser", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const config = useRuntimeConfig();

	const loaded = ref(false);
	const cottageUser = ref(initCottageUser() as CottageUsers);
	const referralCode = ref("");

	function reset() {
		Object.assign(cottageUser.value, { ...initCottageUser() });
		loaded.value = false;
		if (!process.server) {
			document.cookie = "cottageUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	async function getCottageUserByID(id) {
		try {
			const { data, error, status } = await supabase.from("CottageUsers").select("*").eq("id", id).maybeSingle();
			console.log("FROM GET COTTAGE USER BY ID", "data", data, "error", error, "status", status);
			if (error && status !== 406) {
				throw new Error(error.message);
			}
			return data ? data.id : null;
		} catch (error) {
			console.error(`Error fetching CottageUser with ID ${id}:`, error);
			throw error;
		}
	}

	async function getReferralCode(id) {
		try {
			const { data, error, status } = await supabase.from("CottageUsers").select("referralCode").eq("id", id).maybeSingle();
			if (error && status !== 406) {
				throw new Error(error.message);
			}
			referralCode.value = data ? data.referralCode : "";
		} catch (error) {
			console.error(`Error fetching Referral Code with ID ${id}:`, error);
			throw error;
		}
	}

	return {
		cottageUser,
		loaded,
		getCottageUserByID,
		getReferralCode,
		referralCode,
		reset,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCottageUser, import.meta.hot));
}
