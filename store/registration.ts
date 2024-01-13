import { User } from "@supabase/gotrue-js";
import { defineStore, acceptHMRUpdate } from "pinia";
import { Registration, Resident, Property, Address, Occupancy } from "~~/types/Models";
import {
	PropertyType,
	OccupancyType,
	ElectricStatus,
	RegistrationAccountType,
	RegistrationFlowType,
	CottageConnectUserType,
	ElectricSupplyStatus,
} from "~~/types/Enums";
import { isSameDay } from "date-fns";
import { generateReferralString } from "~~/utils/referrals";
import { Database } from "~~/types/db";
import { CommunitySolarStatusTypes } from "~~/types/Enums";

function initRegistration() {
	return {
		resident: {} as Resident,
		property: {} as Property,
		address: {} as Address,
		isAddressCovered: null,
		isActiveBuilding: null,
		isValidAddress: false,
		displayAddress: "",
		referrerCode: null,
		referrerID: null,
		accountType: RegistrationAccountType.NONE,
		flowType: RegistrationFlowType.NONE,
	} as unknown as Partial<Registration>;
}

export const useRegistration = defineStore(
	"registration",
	() => {
		const loaded = ref(false);
		const registration = ref(initRegistration() as Registration);
		const supabase = useSupabaseClient<Database>();
		const { occupancy } = useStore("occupancy");
		const { getAddressIdByGooglePlaceID } = useStore("address");
		const { getPropertyIDByAddressId } = useStore("property");

		function reset() {
			Object.assign(registration.value, initRegistration() as Partial<Registration>);
			loaded.value = false;
			if (!process.server) {
				document.cookie = "registration=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
			}
		}

		async function createRegistration(user: User) {
			const { serviceGroup } = useStore("regServices");
			const { cottageUser } = useStore("cottageUser");
			// create CottageUser
			const { data: cottageUserData, error: cottageUserError } = await supabase
				.from("CottageUsers")
				.insert({
					id: user.id,
					referralCode: registration.value.resident.firstName.toUpperCase() + "-" + generateReferralString(),
					cottageConnectUserType: CottageConnectUserType.CUSTOMER,
					email: user.email,
					termsAndConditionsDate: new Date(),
				})
				.select("*")
				.limit(1)
				.single();
			if (cottageUserError) {
				throw cottageUserError;
			}
			cottageUser.value = cottageUserData;
			console.log("cottageUser.value", cottageUser.value);

			const { firstName, lastName } = registration.value.resident;
			const startServiceDate =
				registration.value.resident.startServiceDate === "" ? new Date().toLocaleDateString() : registration.value.resident.startServiceDate;
			const { data: residentData, error: residentError } = await supabase
				.from("Resident")
				.insert({
					firstName,
					lastName,
					startServiceDate,
					cottageUserID: user.id,
					isRegistrationComplete: false,
				})
				.select("*")
				.limit(1)
				.single();
			if (residentError) {
				throw residentError;
			}
			registration.value.resident = residentData;
			console.log("registration.value.resident", registration.value.resident);

			const existingAddressID = await getAddressIdByGooglePlaceID(registration.value.address.googlePlaceID);
			if (!existingAddressID) {
				const { street, city, state, zip, googlePlaceID } = registration.value.address;
				const { data: addressData, error: addressError } = await supabase
					.from("Address")
					.insert({
						street,
						city,
						state,
						zip,
						googlePlaceID,
					})
					.select("*")
					.limit(1)
					.single();
				if (addressError) {
					throw addressError;
				}
				registration.value.address = addressData;
				console.log("registration.value.address", registration.value.address);
			} else {
				console.log("EXISTING ADDRESS", registration.value.address);
				registration.value.address.id = existingAddressID;
			}

			const unitNumber = registration?.value?.property?.unitNumber;
			const existingProperty = await getPropertyIDByAddressId(registration.value.address.id, unitNumber);
			if (!existingProperty) {
				const propertyType = unitNumber?.length > 0 ? PropertyType.APARTMENT : PropertyType.HOME;
				const { data: propertyData, error: propertyError } = await supabase
					.from("Property")
					.insert({
						addressID: registration.value.address.id,
						unitNumber: unitNumber,
						type: propertyType,
					})
					.select("*")
					.limit(1)
					.single();
				if (propertyError) {
					throw propertyError;
				}
				registration.value.property = propertyData;
			} else {
				registration.value.property.id = existingProperty;
			}

			const { data: electricAccountData, error: electricAccountError } = await supabase
				.from("ElectricAccount")
				.insert({
					isActive: registration.value.accountType === RegistrationAccountType.EXISTING ? true : false,
					electricCompanyID: serviceGroup.value.electricCompanyID?.id,
					cottageUserID: user.id,
					accountNumber: "",
					status: registration.value.accountType === RegistrationAccountType.EXISTING ? ElectricStatus.PENDING_LINK : ElectricStatus.NEW,
					isAccountLinkedWithUtility: false,
					startDate: startServiceDate,
					endDate: "2099-12-31",
					supplyStatus: ElectricSupplyStatus.DEFAULT,
					communitySolarStatus: CommunitySolarStatusTypes.NONE,
					propertyID: registration.value.property.id,
				})
				.select("*")
				.limit(1)
				.single();
			if (electricAccountError) {
				throw electricAccountError;
			}

			const { data: occupancyData, error: occupancyError } = await supabase.from("Occupancy").insert({
				cottageUserID: user.id,
				propertyID: registration.value.property.id,
				electricAccountID: electricAccountData.id,
				startDate: startServiceDate,
				isActive: true,
				endDate: "2099-12-31",
			});
			if (occupancyError) {
				throw occupancyError;
			}
			occupancy.value = occupancyData;

			if (registration.value.referrerCode) {
				try {
					await $fetch("/api/referrals/create-referral", {
						method: "post",
						body: {
							referrerCode: registration.value.referrerCode,
							userID: user.id,
						},
					});
				} catch (error) {
					console.log("ERROR ADDING REFERRAL FOR USER", error);
				}
			}
			try {
				await postCreateAccountNotifications(user.email);
			} catch (error) {
				console.log(error);
			}
		}

		async function postCreateAccountNotifications(userEmail) {
			const mailBody = {
				to: {
					name: registration.value.resident.firstName + " " + registration.value.resident.lastName,
					email: userEmail,
					BCC: "welcome@energybycottage.com",
					BCCName: "Cottage Energy",
				},
				data: {
					firstName: registration.value.resident.firstName,
					streetAddress: registration.value.address.street,
					streetAddress2: registration.value.property.unitNumber,
					city: registration.value.address.city,
					state: registration.value.address.state,
					zip: registration.value.address.zip,
					isNewAccount: registration.value.accountType === RegistrationAccountType.NEW ? true : false,
					isExistingAccount: registration.value.accountType === RegistrationAccountType.EXISTING ? true : false,
				},
				template: "REGISTRATION",
			};

			await useLazyFetch("/api/send-mail", {
				method: "post",
				body: mailBody,
			});

			const alertBody = {
				message: `New registration for ${registration.value.resident.firstName} ${registration.value.resident.lastName} 
				at ${registration.value.address.street}, ${registration.value.property.unitNumber}, 
				${registration.value.address.city}, ${registration.value.address.state}, ${registration.value.address.zip}, 
				at ${new Date().toLocaleString()}`,
				channel: "sign-ups",
			};

			await useLazyFetch("/api/send-alert", {
				method: "post",
				body: alertBody,
			});
		}

		return {
			loaded,
			registration,
			createRegistration,
			reset,
		};
	},
	{
		persist: true,
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRegistration, import.meta.hot));
}
