import { defineStore, acceptHMRUpdate } from "pinia";
import { Occupancy, OccupancyType } from "~~/types/Models";

function initOccupancy() {
	return {
		id: -1,
		cottageUserID: "",
		propertyID: -1,
		electricAccountID: -1,
		startDate: "",
		endDate: "",
		isActive: false,
	} as Partial<Occupancy>;
}

export const useOccupancy = defineStore("occupancy", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const { electricAccount, loaded: electricAccountLoaded } = useStore("electricAccount");
	const { property, loaded: propertyLoaded } = useStore("property");
	const loaded = ref(false);
	const occupancy = ref(initOccupancy() as Occupancy);

	function reset() {
		Object.assign(occupancy.value, initOccupancy() as Occupancy);
		loaded.value = false;
		if (!process.server) {
			document.cookie = "occupancy=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	async function getOccupancy(returnData = false, userID = user.value.id): Promise<Occupancy> {
		const { data, error } = await supabase
			.from("Occupancy")
			.select("*, propertyID(*, addressID(*)), electricAccountID(*, electricCompanyID(*)), cottageUserID(*)")
			.eq("cottageUserID", userID)
			.is("isActive", true)
			.limit(1)
			.single();
		if (error) {
			throw error;
		}
		if (returnData) {
			return data;
		} else {
			console.log("DATA", data);
			const { id, startDate, endDate, isActive, electricAccountID, propertyID } = data as Occupancy;
			occupancy.value = {
				id,
				startDate,
				endDate,
				isActive,
			};
			electricAccount.value = electricAccountID;
			electricAccountLoaded.value = true;
			property.value = propertyID;
			propertyLoaded.value = true;
			loaded.value = true;
		}
	}

	async function getActiveOccupancyRecordByUnitID(unitID: number): Promise<Occupancy | boolean> {
		const { data, error } = await supabase.from("Occupancy").select("*").eq("unit", unitID).eq("isActive", true);
		if (error) throw error;
		if (data.length > 0) {
			return data[0] as Occupancy;
		} else {
			return false;
		}
	}

	// NEEDS TO BE CHANGED FOR MULTI-UNIT SUPPORT
	// async function getOccupancyByUserID(): Promise<void> {}

	// async function updateOccupancy(
	// 	updates: Partial<Occupancy>,
	// ): Promise<void> {}

	return {
		loaded,
		occupancy,
		getOccupancy,
		// updateOccupancy,
		getActiveOccupancyRecordByUnitID,
		reset,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useOccupancy, import.meta.hot));
}
