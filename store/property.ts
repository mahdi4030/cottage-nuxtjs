import { Property } from "~~/types/Models";
import { defineStore, acceptHMRUpdate } from "pinia";
import type { Ref } from "vue";

function initProperty() {
	return {
		id: -1,
		addressID: "",
		type: "",
		unitNumber: "",
	} as Partial<Property>;
}

export const useProperty = defineStore(
	"property",
	() => {
		const supabase = useSupabaseClient();

		const loaded: Ref<boolean> = ref(false);
		const property = ref(initProperty() as Property);

		function reset() {
			Object.assign(property.value, initProperty() as Property);
			loaded.value = false;
			if (!process.server) {
				document.cookie = "property=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
			}
		}

		async function getPropertyIDByAddressId(addressID: string, unitNumber: string | null = null) {
			try {
				let query = supabase.from("Property").select("id").eq("addressID", addressID);
				if (unitNumber === null) {
					query = query.or("unitNumber.eq.null");
				} else {
					query = query.eq("unitNumber", unitNumber);
				}
				const { data, error } = await query;
				if (error) {
					console.error("Error fetching property:", error);
					return null;
				}
				if (data.length === 0) {
					console.log("No property found with the provided addressID and unitNumber");
					return null;
				}
				return data[0].id;
			} catch (err) {
				console.error("Unexpected error:", err);
				return null;
			}
		}

		return {
			getPropertyIDByAddressId,
			reset,
			loaded,
			property,
		};
	},
	{
		persist: true,
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useProperty, import.meta.hot));
}
