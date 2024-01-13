import { PostgrestError } from "@supabase/supabase-js";
import { defineStore, acceptHMRUpdate } from "pinia";
import { RenewableSubscriptions } from "~~/types/Models";

export const useRenewableSubscription = defineStore("renewableSubscription", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const loaded = ref(false);
	const renewableSubscription = ref(null as unknown as RenewableSubscriptions);

	function reset() {
		renewableSubscription.value = null as unknown as RenewableSubscriptions;
		loaded.value = false;
		if (!process.server) {
			document.cookie = "renewableSubscription=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	async function getActiveSubscriptionByUnitID(unit: number): Promise<RenewableSubscriptions[] | PostgrestError> {
		const today = new Date().toLocaleDateString();
		const { data, error } = await supabase
			.from("RenewableSubscriptions")
			.select("*")
			.eq("unit", unit)
			.lte("startDate", today)
			.gt("endDate", today);
		if (error) {
			throw error;
		} else {
			return data;
		}
	}

	async function getActiveSubscriptionByUserID(): Promise<void> {
		const today = new Date().toLocaleDateString();
		try {
			const { data } = await supabase
				.from("RenewableSubscriptions")
				.select("*, renewableSubscriptionPlan(*)")
				.eq("resident", user.value.id)
				.lte("startDate", today)
				.gt("endDate", today)
				.limit(1)
				.single();
			loaded.value = true;
			renewableSubscription.value = data;
		} catch (error) {
			renewableSubscription.value = {};
		}
	}

	async function setEndDateForSubscriptionByID(
		id: number,
		date = new Date().toLocaleDateString(),
	): Promise<RenewableSubscriptions[] | PostgrestError> {
		const { data, error } = await supabase
			.from("RenewableSubscriptions")
			.update({
				endDate: date,
			})
			.eq("id", id)
			.select();
		if (error) {
			throw error;
		} else {
			renewableSubscription.value = data[0];
		}
	}
	async function createRenewableEnergySubscriptionForResident(): Promise<RenewableSubscriptions[] | PostgrestError> {
		const { occupancy } = useStore("occupancy");
		const { serviceGroup } = useStore("regServices");
		const subscriptionData = {
			resident: user.value.id,
			renewableSubscriptionPlan: serviceGroup.value.renewableSubscriptionPlan.id,
			unit: occupancy.value.unit.id,
			startDate: new Date().toLocaleDateString(),
			endDate: "2099-12-31",
		};
		const { data, error } = await supabase.from("RenewableSubscriptions").insert(subscriptionData).select();
		if (error) {
			throw error;
		}
		renewableSubscription.value = data[0];
	}

	return {
		loaded,
		renewableSubscription,
		getActiveSubscriptionByUnitID,
		getActiveSubscriptionByUserID,
		setEndDateForSubscriptionByID,
		createRenewableEnergySubscriptionForResident,
		reset,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRenewableSubscription, import.meta.hot));
}
