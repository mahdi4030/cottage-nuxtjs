import { defineStore, acceptHMRUpdate } from "pinia";
import { ElectricBill } from "~~/types/Models";
import type { Ref } from "vue";
import { ElectricIntegrationType } from "~~/types/Enums";

export const useElectricBill = defineStore("electricBill", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const { occupancy, getOccupancy, loaded: loadedOccupancy } = useStore("occupancy");
	const { electricAccount, loaded: electricAccountLoaded } = useStore("electricAccount");
	const loaded: Ref<boolean> = ref(false);
	const bills: Ref<ElectricBill[]> = ref([] as ElectricBill[]);
	const fetchingData: Ref<boolean> = ref(false);

	function reset() {
		bills.value = [] as ElectricBill[];
		loaded.value = false;
		if (!process.server) {
			document.cookie = "electricBill=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		}
	}

	function fetchElectricData() {
		if (electricAccount.value.isAccountLinkedWithUtility) {
			if (electricAccount.value.electricCompanyID.electricIntegrationType === ElectricIntegrationType.GREENBUTTON) {
				const greenButtonBody = {
					provider: electricAccount.value.electricCompanyID.id,
					operations: ["meter readings", "customer data", "billing summaries", "historic data"],
				};
				fetchingData.value = true;
				useLazyFetch("/api/_private/sync-green-button", {
					method: "post",
					body: greenButtonBody,
				});
			} else if (electricAccount.value.electricCompanyID.electricIntegrationType === ElectricIntegrationType.AUTOMATION) {
				const automationBody = {
					provider: electricAccount.value.electricCompanyID.id.toLowerCase(),
					userId: user.value.id,
					accountNumber: electricAccount.value.accountNumber,
				};
				fetchingData.value = true;
				useLazyFetch("/api/utility-connect/get-billing-history", {
					method: "post",
					body: automationBody,
				});
			}
		}
	}

	async function getElectricityBills(userID: string = user.value.id): Promise<ElectricBill[]> {
		if (!loadedOccupancy.value) {
			await getOccupancy();
		}
		const { data, error } = await supabase
			.from("ElectricBill")
			.select("*")
			.eq("electricAccountID", electricAccount.value.id)
			.order("startDate", { ascending: false });
		if (error) throw error;
		bills.value = data.map((bill) => {
			return {
				...bill,
				totalAmountDue: bill.totalAmountDue / 100,
			};
		});
		loaded.value = true;
		return data;
	}

	return {
		loaded,
		fetchingData,
		bills,
		fetchElectricData,
		getElectricityBills,
		reset,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useElectricBill, import.meta.hot));
}
