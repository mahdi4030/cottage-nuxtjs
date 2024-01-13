<template>
	<div class="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
		<ClientOnly>
			<ModalAddressNotFound :is-open="isAddressNotFoundOpen" @closeAction="closeAddressNotFound" />
		</ClientOnly>
		<h2 class="text-center leading-tight">
			{{ registration.isAddressCovered ? "You're covered 👍 Add an unit number if you have one" : "Let's do an address check 🔎" }}
		</h2>
		<div class="p-6 flex flex-col w-full">
			<ClientOnly>
				<Transition name="fade" mode="out-in">
					<div class="flex flex-col w-full">
						<p v-if="registration.isAddressCovered" class="pb-4 text-center">If you do not have a unit number, you can leave it blank.</p>
						<p v-else class="pb-4 text-center">Select an address. If you do not have a unit number, you can leave it blank.</p>
						<div class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 w-full max-w-2xl mx-auto">
							<div class="sm:col-span-5">
								<BaseAddressGoogle
									v-model="registration.displayAddress"
									input-name="displayAddress"
									placeholder="Address"
									:return-full-address="true"
									@setAddressComponents="setAddressComponents"
								>
									Address
								</BaseAddressGoogle>
							</div>
							<div class="sm:col-span-1">
								<BaseInput v-model="registration.property.unitNumber" input-name="unitNumber" input-class="my-0">Unit</BaseInput>
							</div>
						</div>
					</div>
				</Transition>
			</ClientOnly>
			<div class="text-center w-full">
				<div class="text-base underline text-green-700 mt-4 cursor-pointer font-semibold" @click="isAddressNotFoundOpen = true">
					I cannot find my address
				</div>
			</div>
		</div>
		<div class="container lg:px-6 pb-4 pt-4">
			<FormNavigation
				:is-next-disabled="isNextDisabled"
				:show-previous="true"
				:next-button-text="registration.isValidAddress ? 'Continue' : 'Check Coverage'"
				nav-btn-style="py-3 lg:py-4 text-lg lg:text-xl"
				:processing-request="startAddressCheck"
				processing-request-text="Checking..."
				@nextPage="nextPage"
				@previousPage="navigateToPreviousPage"
				:is-fixed-to-bottom="false"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ServiceGroupStatus } from "~~/types/Enums";

const { getServiceGroup } = useStore("regServices");
const { registration } = useStore("registration");
const { getActiveOccupancyRecordByUnitID } = useStore("occupancy");
const { navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();
const startAddressCheck = ref(false);
const errorMessage = ref("");
const hasErrors = ref(false);
const selectedAddress = ref(null);

const isAddressNotFoundOpen = ref(false);
function closeAddressNotFound() {
	isAddressNotFoundOpen.value = false;
}

const isNextDisabled = computed(() => {
	if (registration.value.isValidAddress === false) {
		return true;
	} else if (registration.value.displayAddress.length < 5) {
		return true;
	}
	return false;
});

onMounted(async () => {
	if (registration.value.isValidAddress) {
		selectedAddress.value = registration.value.displayAddress;
	}
});

async function nextPage() {
	startAddressCheck.value = true;
	hasErrors.value = false;

	const serviceGroupStatus = await getServiceGroup(registration.value.address.zip);
	if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
		navigateToNextPage();
		registration.value.isAddressCovered = serviceGroupStatus === ServiceGroupStatus.ACTIVE;
	} else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
		return navigateTo("/onboarding/join-beta");
	} else {
		return navigateTo("/onboarding/join-waitlist");
	}
}

async function setAddressComponents(val) {
	selectedAddress.value = registration.value.displayAddress;
	registration.value.isValidAddress = true;
	registration.value.isAddressCovered = null;
	registration.value.address.street = val.streetNum + " " + val.streetName;
	registration.value.address.city = val.city;
	registration.value.address.state = val.state;
	registration.value.address.zip = val.zip;

	registration.value.address.googlePlaceID = val.place_id;
	// check to see if the building is known. If it is, pass them to the found building page to select a unit
}
</script>
