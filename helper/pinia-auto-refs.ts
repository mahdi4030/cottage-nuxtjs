// "https://github.com/Allen-1998/pinia-auto-refs"
import { AutoToRefs, ToRef } from "vue";
import { storeToRefs } from "pinia";

import { useElectricBill } from "@/store/electricBill";
import { useElectricAccount } from "@/store/electricAccount";
import { useGreenButtonOAuth } from "@/store/greenButtonOAuth";
import { useOccupancy } from "~~/store/occupancy";
import { useRegistration } from "@/store/registration";
import { useResident } from "@/store/resident";
import { useRegServices } from "@/store/regServices";
import { useRenewableSubscription } from "@/store/renewableSubscription";
import { useReferrals } from "@/store/referrals";
import { useCottageUser } from "@/store/cottageUser";
import { useAddress } from "~/store/address";
import { useProperty } from "~/store/property";
import { useApp } from "@/store/app";

declare module "vue" {
	export type AutoToRefs<T> = {
		// eslint-disable-next-line @typescript-eslint/ban-types
		[K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>;
	};
}

const storeExports = {
	electricBill: useElectricBill,
	electricAccount: useElectricAccount,
	greenButtonOAuth: useGreenButtonOAuth,
	renewableSubscription: useRenewableSubscription,
	occupancy: useOccupancy,
	registration: useRegistration,
	resident: useResident,
	regServices: useRegServices,
	referrals: useReferrals,
	cottageUser: useCottageUser,
	address: useAddress,
	property: useProperty,
	app: useApp,
};

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
	const store = storeExports[storeName]();
	const storeRefs = storeToRefs(store);
	return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<(typeof storeExports)[T]>>;
}
