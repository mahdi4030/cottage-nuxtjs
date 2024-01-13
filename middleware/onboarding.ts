import { useStore } from "~/helper/pinia-auto-refs";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const { registration } = useStore("registration");
	const { loaded, getServiceGroup } = useStore("regServices");

	if (to.name !== "onboarding-start" && to.name !== "onboarding-address") {
		if (!registration.value.isAddressCovered && to.name !== "onboarding-join-waitlist" && to.name !== "onboarding-join-beta") {
			return navigateTo("/onboarding/address");
		}
	}
});
