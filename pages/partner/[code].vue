<template>
	<div>
		<ClientOnly>
			<ModalAddressNotFound :is-open="isAddressNotFoundOpen" @closeAction="closeAddressNotFound" />
		</ClientOnly>
		<div class="w-screen flex flex-col">
			<section class="bg-forrest-700 w-full relative">
				<div class="flex flex-col items-center mt-20 container m-auto text-center z-10 px-6 md:px-0 pb-16 text-white">
					<div class="flex flex-col z-10 w-full max-w-2xl">
						<div class="py-4 m-auto">
							<!-- <img class="h-auto w-48" src="/img/partners/liv-logo.png" /> -->
							<img class="h-auto w-48" :src="partner.imgURL" />
						</div>
						<h1 class="pt-4 pb-8 text-white">Hey there 👋</h1>
						<div class="text-lg md:text-xl leading-tight pb-4">
							We take the hassle out of setting up your home’s electricity account. <br />
							We also power your home with <b>renewable energy. No extra cost.</b>
						</div>
						<div class="text-lg pt-2 pb-2">Select your address below to get started</div>
						<div class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 w-full max-w-2xl text-left">
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
						<div class="flex flex-row space-x-0 md:space-x-4 justify-center mt-3">
							<BaseButton :is-disabled="isNextDisabled" btn-type="primary" class="w-full md:w-64" @click="handleGetStarted">
								Get Started
							</BaseButton>
						</div>
						<div class="text-base underline text-white mt-6 cursor-pointer font-semibold" @click="isAddressNotFoundOpen = true">
							I cannot find my building
						</div>
					</div>
				</div>
			</section>
			<section class="bg-tan-200 w-full py-16 lg:pt-20">
				<div class="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
					<h4 class="pb-4">EASY AND FAST</h4>
					<h2 class="md:pb-8">Sign-up in 3 easy steps</h2>
					<div class="flex flex-col lg:flex-row py-4 space-x-0 md:space-x-16">
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<nuxt-icon name="location" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
							<h3 class="">Sign-up with your address</h3>
							<div class="text-lg leading-tight py-1">Enter your address for your home or apartment building.</div>
						</div>
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<nuxt-icon name="add-user" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
							<h3 class="">We sign-up with the utility</h3>
							<div class="text-lg leading-tight py-1">
								If you don't have an existing account, we register you with your local utility company and take care of setting up
								your online account.
							</div>
						</div>
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
							<nuxt-icon name="green-earth" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
							<h3 class="">Support a greener future</h3>
							<div class="text-lg leading-tight py-1">
								Join the thousands of individuals who are driving the demand for renewable energy and significantly reducing their
								carbon footprint at the same time.
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="bg-tan-500 w-full py-16 lg:py-20">
				<div class="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
					<h2 class="text-center pb-2">Why sign-up with Cottage?</h2>
					<p class="py-4 max-w-3xl text-center mx-auto">
						Our goal is to make it simple for you to reduce your carbon footprint and contribute to a cleaner world, no matter if you rent
						or own your home.
					</p>
					<div class="text-lg md:text-xl font-semibold text-center">In just one year with us you can make an impact equivalent to…</div>
					<div class="flex flex-col md:flex-row py-8 text-center items-start space-y-8 md:space-y-0 md:space-x-20">
						<div class="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
							<nuxt-icon name="bulb" class="text-5xl pb-2" filled />
							<p class="text-lg md:text-xl !leading-tight">Switching <b>140 light bulbs</b> to LED</p>
						</div>
						<div class="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
							<nuxt-icon name="car" class="text-5xl pb-2" filled />
							<p class="text-lg md:text-xl !leading-tight">Driving <b>9,000 fewer miles</b> in your car</p>
						</div>
						<div class="flex flex-col justify-center items-center w-full md:w-[13.5rem]">
							<nuxt-icon name="recycle" class="text-5xl pb-2" filled />
							<p class="text-lg md:text-xl !leading-tight">Recycling for <b>7 years</b></p>
						</div>
					</div>
					<p class="text-textblack/80 text-sm text-center">
						*Estimated using EPA EGrid Emission Factor data, and the U.S. Environmental Protection Agency's greenhouse gas equivalencies
						calculator
					</p>
				</div>
			</section>
			<section class="w-full py-16 lg:pt-20">
				<h2 class="text-center">Have more questions?</h2>
				<div class="flex flex-col py-8 max-w-3xl mx-auto text-left">
					<ClientOnly>
						<FAQBody />
					</ClientOnly>
				</div>
			</section>
			<section class="w-full py-16 pb-32 lg:pt-20">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="mx-auto max-w-2xl md:text-center">
						<h2 class="text-center">Join the green energy revolution</h2>
						<p class="py-6 max-w-4xl text-center mx-auto">Something better for you and your neighbors</p>
					</div>
					<div class="w-full mx-auto">
						<ClientOnly>
							<TestimonialsCarousel />
						</ClientOnly>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ServiceGroupStatus, RegistrationFlowType } from "~~/types/Enums";
import { useStore } from "~/helper/pinia-auto-refs";
const { buildingList, partner } = useStore("regServices");
const { registration } = useStore("registration");
const { getServiceGroup } = useStore("regServices");

const selectedBuilding = ref(null);
const selectedAddress = ref(null);

const referralImgURL = ref("");

const isNextDisabled = computed(() => {
	if (selectedAddress.value !== null) {
		return false;
	}
	return true;
});

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

async function handleGetStarted() {
	const serviceGroupStatus = await getServiceGroup(registration.value.address.zip);
	registration.value.isAddressCovered = serviceGroupStatus === ServiceGroupStatus.ACTIVE;
	if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
		registration.value.flowType = RegistrationFlowType.PARTNER;
		registration.value.referrerCode = partner.value.referralCode ?? null;
		return navigateTo("/onboarding/service");
	} else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
		return navigateTo("/onboarding/join-beta");
	} else {
		return navigateTo("/onboarding/join-waitlist");
	}
}

const isAddressNotFoundOpen = ref(false);
function closeAddressNotFound() {
	isAddressNotFoundOpen.value = false;
}

onMounted(async () => {
	registration.value.displayAddress = "";
	try {
		await useAuth().logout();
	} catch (error) {
		console.log("No logged in account");
	}
});

definePageMeta({
	middleware: async () => {
		useResetOnboarding();
		const route = useRoute();
		const { code } = route.params;
		const { routingPath } = useOnboardingNavigation();
		const { partnerCode, partner } = useStore("regServices");
		partnerCode.value = (code as string) ?? partnerCode.value;
		routingPath.value = RegistrationFlowType.PARTNER;
		console.log(partnerCode.value);
		try {
			const data = await $fetch("/api/referrals/get-partner/" + partnerCode.value, {
				method: "get",
			});
			partner.value = data;
		} catch (error) {
			console.log(error);
		}
	},
});
</script>

<style lang="sass" scoped></style>
