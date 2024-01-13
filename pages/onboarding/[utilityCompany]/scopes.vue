<template>
	<div class="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl w-full">
		<ModalInfo :is-modal-open="isModalOpen" @closeModal="closeModal">
			<template #header>How Cottage uses this information</template>
			<template #body>
				<div class="flex flex-col py-4 max-w-2xl mx-auto text-left">
					<div class="mx-auto">
						<ul class="text-left space-y-2">
							<li class="py-2 flex flex-row">
								<nuxt-icon name="circle-check" class="text-2xl mr-2" filled />
								<div class="text-lg md:text-xl">
									As we find new ways to save you money, we
									<b>provide personalized recommendations</b>
									based on your usage profile
								</div>
							</li>
							<li class="py-2 flex flex-row">
								<nuxt-icon name="circle-check" class="text-2xl mr-2" filled />
								<div class="text-lg md:text-xl">
									We break down your utility statements directly in Cottage and provide
									<b>a more transparent explanation of your consumption</b>
								</div>
							</li>
							<li class="py-2 flex flex-row">
								<nuxt-icon name="circle-check" class="text-2xl mr-2" filled />
								<div class="text-lg md:text-xl">
									Based on your past consumption, we can provide
									<b>accurate forecasts of your upcoming bills</b>
									so you're never surprised
								</div>
							</li>
							<li class="py-2 flex flex-row">
								<nuxt-icon name="circle-check" class="text-2xl mr-2" filled />
								<div class="text-lg md:text-xl">
									Hate having multiple internet accounts? Connecting your data allows us to provide
									<b>a single platform to manage your energy</b>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</template>
		</ModalInfo>
		<div v-if="hasEndDateError && pageLoaded" class="text-center">
			<h2>Increase the sharing time frame</h2>
			<div class="flex flex-col w-full max-w-2xl pt-4">
				<div class="text-forrest-700 text-lg text-center">
					To make sure Cottage can continuously work in the background for you, we need ongoing access to your usage. When prompted to
					select a time frame, select
					<b>Share it until I revoke it</b>
					from the drop down.
				</div>
				<img class="object-cover w-full py-4" src="~/assets/img/coned/coned-share-timeframe.png" alt="" />
				<BaseButton btn-type="primary" btn-style="mx-auto" class="flex w-full mb-4" btn-size="large" @click="redirectBackToConEd">
					Retry
				</BaseButton>
			</div>
		</div>
		<div v-if="!hasEndDateError && pageLoaded" class="text-center">
			<h2 class="pb-4">Connecting your accounts</h2>
			<ElementsOnboardingCard class="flex flex-col w-full max-w-xl">
				<div class="text-forrest-700 text-lg md:text-xl text-center leading-5">Connect your utility account and the following data:</div>
				<div class="w-full text-left py-2">
					<div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 w-full">
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="invoice" class="text-2xl mr-2" filled />
									<span>Billing data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Utility bill amounts, due dates, service dates
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="electricity" class="text-2xl mr-2" filled />
									<span>Consumption data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Monthly energy consumption, electricity rate
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="consumption" class="text-2xl mr-2" filled />
									<span>Real-time data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Hourly energy usage profile as reported by your smart meter
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="account" class="text-2xl mr-2" filled />
									<span>Customer information</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Utility account number, service address, utility service type (electric, gas, etc.)
							</DisclosurePanel>
						</Disclosure>
					</div>
				</div>
				<div class="flex flex-row bg-green-700/10 p-5 rounded-lg text-left space-x-4 md:mx-4 mb-2 items-center">
					<nuxt-icon name="privacy" class="text-3xl" filled />
					<div class="text-forrest-700 text-base leading-4">
						Your privacy matters to us. We do not sell your data and whenever you delete your Cottage account, we also delete your
						personal data.
					</div>
				</div>
				<a class="text-lg text-center mt-4 text-green-700 underline cursor-pointer font-semibold" @click="isModalOpen = true">
					Why does Cottage want access to this information?
				</a>
				<BaseButton
					btn-size="large"
					:btn-style="[
						'w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
						processingRequest ? 'cursor-not-allowed' : '',
					]"
					btn-type="primary"
					class="flex w-full mt-6 mb-4"
					:disabled="processingRequest"
					@click="redirectToUtility"
				>
					<div v-if="!processingRequest">Accept</div>
					<div v-if="processingRequest" class="inline-flex items-center space-x-2">
						<svg class="animate-spin -mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>Processing Request...</span>
					</div>
				</BaseButton>
			</ElementsOnboardingCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/24/solid";
import { differenceInMonths } from "date-fns";

const route = useRoute();
const utilityCompany = route.params.utilityCompany;

const config = useRuntimeConfig();
const { oAuthConfig } = useUtilityIntegration();
const { greenButton } = useStore("greenButtonOAuth");
const { serviceGroup } = useStore("regServices");
const processingRequest = ref(false);
const isModalOpen = ref(false);
const hasEndDateError = ref(false);
const pageLoaded = ref(false);

function closeModal() {
	isModalOpen.value = false;
}

function redirectBackToConEd() {
	const route = useRoute();
	const { accountid, startdate, enddate, DataCustodianID } = route.query;

	// Manually creating backup cookies in case the Green Button Cookies Didnt Sync
	const greenButtonStartDate = useCookie("greenButtonStartDate", {
		maxAge: 3600,
	});
	const greenButtonEndDate = useCookie("greenButtonEndDate", {
		maxAge: 3600,
	});
	const electricCompany = useCookie("electricCompany", { maxAge: 3600 });

	greenButtonStartDate.value = startdate as string;
	greenButtonEndDate.value = enddate as string;
	electricCompany.value = serviceGroup.value.electricCompanyID.id;
	window.location.href = oAuthConfig().REDIRECT_TO_UTILITY;
}

onMounted(async () => {
	const route = useRoute();
	const { accountid, startdate, enddate, DataCustodianID } = route.query;
	if (enddate) {
		const today = new Date();
		const sharingEndDate = new Date(enddate as string);
		const diffInMonths = differenceInMonths(sharingEndDate, today);
		if (diffInMonths > 10) {
			greenButton.value.startDate = (startdate as string) ?? "";
			greenButton.value.endDate = (enddate as string) ?? "";
		} else {
			hasEndDateError.value = true;
		}
	} else {
		hasEndDateError.value = true;
	}
	pageLoaded.value = true;
});

const redirectToUtility = async () => {
	processingRequest.value = true;
	const { oAuthConfig } = useUtilityIntegration();
	const route = useRoute();
	const { accountid, startdate, enddate, DataCustodianID } = route.query;

	if (startdate) {
		const greenButtonStartDate = useCookie("greenButtonStartDate", {
			maxAge: 3600,
		});
		greenButtonStartDate.value = startdate as string;
		greenButton.value.startDate = (startdate as string) ?? "";
	}
	if (enddate) {
		const greenButtonEndDate = useCookie("greenButtonEndDate", {
			maxAge: 3600,
		});
		greenButtonEndDate.value = enddate as string;
		greenButton.value.endDate = (enddate as string) ?? "";
	}

	const electricCompany = useCookie("electricCompany", { maxAge: 3600 });

	if (DataCustodianID) {
		if (DataCustodianID === "ConEdison") {
			electricCompany.value = "CON_EDISON";
		} else if (DataCustodianID === "ComEd") {
			electricCompany.value = "COM_ED";
		} else {
			electricCompany.value = "ORU";
		}
	}

	electricCompany.value = serviceGroup.value.electricCompanyID.id;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.location.href = oAuthConfig(electricCompany.value).SCOPES_REDIRECT_URL;
};

definePageMeta({
	layout: "onboarding",
});
</script>
