export function useResetLogout() {
	const { reset: resetResident } = useStore("resident");
	const { reset: resetOccupancy } = useStore("occupancy");
	const { reset: resetProperty } = useStore("property");
	const { reset: resetElectricAccount } = useStore("electricAccount");
	const { reset: resetRegServices, resetPartnerCode } = useStore("regServices");
	resetResident();
	resetOccupancy();
	resetProperty();
	resetElectricAccount();
	resetRegServices();
	resetPartnerCode();
}

export function useResetOnboarding() {
	const { reset: resetRegistration } = useStore("registration");
	const { reset: resetRegServices } = useStore("regServices");
	resetRegistration();
	resetRegServices();
}
