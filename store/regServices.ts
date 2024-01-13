import { acceptHMRUpdate, defineStore } from "pinia";
import { ElectricSupplyPlan, ServiceGroup, ElectricCompany, Building, RenewableSubscriptionPlan } from "~~/types/Models";
import { CommunitySolarAvailabilityTypes, ServiceGroupStatus } from "~~/types/Enums";
import { PostgrestError } from "@supabase/postgrest-js";
import type { Database } from "~~/types/db";

function initServiceGroup() {
	return {
		id: "",
		status: "",
		communitySolarAvailability: CommunitySolarAvailabilityTypes.NONE,
		electricCompanyID: {} as ElectricCompany,
		activeSupplyPlanID: {} as ElectricSupplyPlan,
		renewableSubscriptionPlanID: {} as RenewableSubscriptionPlan,
		isActiveReferralProgram: false,
		referralProgramAmount: null,
	} as unknown as Partial<ServiceGroup>;
}

export const useRegServices = defineStore(
	"regServices",
	() => {
		const supabase = useSupabaseClient<Database>();
		const user = useSupabaseUser();

		const loaded = ref(false);
		const serviceGroup = ref(initServiceGroup() as ServiceGroup);
		const buildingList = ref([]);
		const building = ref({} as Building);
		const partnerCode = ref(null);
		const partner = ref({});

		function resetPartnerCode() {
			partnerCode.value = null;
		}

		function reset() {
			// Object.assign(state, initServiceGroup() as Partial<ServiceGroup>);
			Object.assign(serviceGroup.value, initServiceGroup());
			loaded.value = false;
			buildingList.value = [];
			building.value = {} as Building;
			// partner.value = {};
			if (!process.server) {
				document.cookie = "regServices=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
			}
		}

		async function getServiceGroup(zip: string): Promise<ServiceGroupStatus> {
			let status = ServiceGroupStatus.NOT_ACTIVE;
			const { data, error } = await supabase
				.from("ServiceZip")
				.select("*, serviceGroup(*, electricCompanyID(*))")
				.eq("id", zip)
				.limit(1)
				.single();
			if (!error) {
				serviceGroup.value = data.serviceGroup;
				status = data.serviceGroup.status;
			}
			return status;
		}

		async function checkBuilding(googlePlaceID: string): Promise<boolean> {
			let isBuilding = false;
			const { data } = await supabase.from("Building").select("*").eq("googlePlaceID", googlePlaceID);
			if (data.length == 1) {
				building.value = data[0];
				isBuilding = true;
			}
			return isBuilding;
		}

		async function getBuildingListByReferrerCode(code = partnerCode.value): Promise<void | PostgrestError> {
			// const { data, error } = await supabase.from("ReferralPartner").select("*").eq("code", code);
			const { data, error } = await supabase
				.from("ReferralPartner_Building")
				.select("ReferralPartner (id, code), Building (id, name, addressID (id, street, city, state, zip, googlePlaceID))")
				.filter("ReferralPartner.code", "eq", code);

			if (!error) {
				buildingList.value = data.map((item) => item.Building);
				console.log(buildingList.value);
			}
			if (error) {
				console.log(error);
			}
		}

		// async function getUnitOccupancyByGooglePlaceID(googlePlaceID: string, streetAddress2: string): Promise<Unit[]> {
		// 	const { data, error } = await supabase.from("Unit").select("*").eq("googlePlaceID", googlePlaceID).eq("streetAddress2", streetAddress2);
		// 	if (error) {
		// 		throw error;
		// 	}
		// 	return data as Unit[];
		// }

		return {
			loaded,
			serviceGroup,
			partnerCode,
			building,
			buildingList,
			getServiceGroup,
			checkBuilding,
			getBuildingListByReferrerCode,
			reset,
			resetPartnerCode,
			partner,
		};
	},
	{
		persist: {
			paths: [
				"partnerCode",
				"serviceGroup.id",
				"serviceGroup.communitySolarAvailability",
				"serviceGroup.electricCompanyID",
				"serviceGroup.electricCompany",
				"serviceGroup.activeSupplyPlanIDs",
				"serviceGroup.referralProgramAmount",
				"serviceGroup.isActiveReferralProgram",
				"building",
			],
		},
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRegServices, import.meta.hot));
}
