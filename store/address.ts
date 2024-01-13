import { defineStore, acceptHMRUpdate } from "pinia";
import type { Ref } from "vue";

export const useAddress = defineStore(
	"address",
	() => {
		const supabase = useSupabaseClient();

		async function getAddressIdByGooglePlaceID(googlePlaceID) {
			// Check if a record with the given googlePlaceID exists in the Address table
			const { data, error } = await supabase.from("Address").select("id").eq("googlePlaceID", googlePlaceID).maybeSingle();
			if (error) {
				console.error(error);
				return null;
			}
			// If a record exists, return its id field
			if (data) {
				return data.id;
			}
			// If no record exists with the given googlePlaceID, return null
			return null;
		}

		return {
			getAddressIdByGooglePlaceID,
		};
	},
	{
		persist: true,
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAddress, import.meta.hot));
}
