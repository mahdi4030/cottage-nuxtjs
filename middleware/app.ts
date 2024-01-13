import { useStore } from "~/helper/pinia-auto-refs";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const arrPromises = [];
	const { loaded: loadedResident, getResident } = useStore("resident");
	const { loaded: loadedOccupancy, getOccupancy, occupancy } = useStore("occupancy");
	const { loaded: loadedServiceGroup, getServiceGroup } = useStore("regServices");
	const { property } = useStore("property");

	// TODO: FIX THIS TO HANDLE EXCEPTIONS
	if (!process.server) {
		if (!loadedOccupancy.value) {
			arrPromises.push(getOccupancy());
		}
		if (!loadedResident.value) {
			arrPromises.push(getResident());
		}
		try {
			await Promise.all(arrPromises);
			if (!loadedServiceGroup.value) {
				await getServiceGroup(property.value.addressID.zip);
			}
		} catch (error) {
			console.log(error);
		}
	}
});
