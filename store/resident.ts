import { defineStore, acceptHMRUpdate } from "pinia";
import { Resident } from "~~/types/Models";

function initResident() {
	return {
		id: -1,
		cottageUserID: null,
		firstName: "",
		lastName: "",
		phone: "",
		startServiceDate: "",
		isRegistrationComplete: false,
	} as Resident;
}

export const useResident = defineStore("resident", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const config = useRuntimeConfig();

	const loaded = ref(false);
	const resident = ref(initResident() as Resident);
	const isResidentIdentityLoaded = ref(false);
	const isResidentIdentityComplete = ref(false);

	function reset() {
		Object.assign(resident.value, { ...initResident() });
		loaded.value = false;
		if (!process.server) {
			document.cookie = "resident=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	async function getResident(returnData = false, userID = user.value.id): Promise<Resident> {
		// console.log("USER IN RES", userID);
		const { data, error } = await supabase.from("Resident").select("*").eq("cottageUserID", userID).maybeSingle();
		if (error) {
			throw error;
		}
		if (returnData) {
			return data;
		} else {
			resident.value = data;
			loaded.value = true;
		}
	}

	// write a function that checks if the ResidentIdentity is complete based on the ResidentIdentity table in the DB
	async function checkResidentIdentity(cottageUserID) {
		const { data, error } = await supabase.from("ResidentIdentity").select("*").eq("cottageUserID", cottageUserID).maybeSingle();
		if (error) {
			throw error;
		}
		if (data) {
			isResidentIdentityComplete.value = true;
			isResidentIdentityLoaded.value = true;
		} else {
			isResidentIdentityComplete.value = false;
			isResidentIdentityLoaded.value = true;
		}
	}

	async function updateResident(updates: object, updateObject = true): Promise<void> {
		const { data, error } = await supabase.from("Resident").update(updates).eq("cottageUserID", user.value.id);
		if (error) {
			throw error;
		}
		if (updateObject) {
			resident.value = { ...resident.value, ...updates };
		}
	}

	return {
		loaded,
		resident,
		getResident,
		updateResident,
		reset,
		isResidentIdentityComplete,
		checkResidentIdentity,
		isResidentIdentityLoaded,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useResident, import.meta.hot));
}
