<template>
	<div class="flex flex-col items-center justify-between w-full">
		<OnboardingModalUsageInfo :is-open="isUsageInfoModalOpen" @close-action="closeUsageInfoModal" />
		<OnboardingModalGreenButtonRedirect :is-modal-open="isGreenButtonRedirectOpen" @cancel-action="closeGreenButtonRedirect" />
		<div v-if="electricAccount.isAccountLinkedWithUtility" class="flex flex-col w-full pt-4">
			<div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<div class="p-6 border border-border rounded-lg flex">
						<div class="flex flex-col">
							<div class="mb-4">
								<img class="h-8" :src="serviceGroup.electricCompanyID.logoURL" />
							</div>
							<div class="text-xl font-semibold pb-1">
								{{ electricAccount.electricCompanyID?.name }}
							</div>
							<div class="text-base">Account Number: {{ electricAccount?.accountNumber }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!electricAccount.isAccountLinkedWithUtility" class="flex flex-col w-full">
			<div v-if="isUtilityLinkError == true" class="flex flex-col items-center">
				<h3>Oops! That didn't work...</h3>
				<nuxt-icon name="sad" class="py-4" style="font-size: 5rem" filled />
				<div class="flex flex-col w-full max-w-lg pt-4">
					<div class="text-forrest-700 text-xl text-center">
						Something went wrong... Mind trying again?
						<br />
						If this keeps happening,
						<a class="underline text-green-700 font-semibold cursor-pointer" @click="openChat">open up a chat</a>
						or give us a call
						<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
					</div>
					<BaseButton
						btn-type="primary"
						btn-style="w-full"
						class="flex mt-8 w-full"
						btn-size="large"
						@click.stop.prevent
						@click="resetUtilityAccountLink"
					>
						Try Again
					</BaseButton>
				</div>
			</div>
			<div v-if="!electricAccount.isAccountLinkedWithUtility && isUtilityLinkError == false" class="flex flex-col items-center">
				<div class="flex flex-col w-full lg:px-20 md:w-2/3 mx-auto pt-4 items-center">
					<div class="mb-4 mt-2">
						<img class="h-8" :src="serviceGroup.electricCompanyID.logoURL" />
					</div>
					<div
						v-if="
							serviceGroup.electricCompanyID.isElectricIntegrationActive &&
							serviceGroup.electricCompanyID.electricIntegrationType === ElectricIntegrationType.GREENBUTTON
						"
					>
						<div class="flex flex-col items-center">
							<BaseButton @click.stop.prevent @click="isGreenButtonRedirectOpen = true">Connect My Account</BaseButton>
						</div>
					</div>
					<div
						v-if="
							serviceGroup.electricCompanyID.isElectricIntegrationActive &&
							serviceGroup.electricCompanyID.electricIntegrationType === ElectricIntegrationType.AUTOMATION
						"
					>
						<UtilityConnectStepper @connected-account="connectedAccount" />
					</div>
				</div>
				<p class="pt-4 cursor-pointer font-semibold text-green-700 underline text-base" @click="isUsageInfoModalOpen = true">
					Learn what information we collect and how we use this information
				</p>
				<div class="flex flex-row bg-green-50 p-4 text-center rounded-lg my-4 items-center w-full">
					<div class="text-forrest-700 text-base leading-4 w-full">
						We do not sell your data and whenever you delete your Cottage account, we also delete your personal data.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ChevronUpIcon } from "@heroicons/vue/24/solid";
import { ElectricIntegrationType, ElectricStatus } from "~~/types/Enums";

const { occupancy, getOccupancy } = useStore("occupancy");
const { serviceGroup } = useStore("regServices");
const { fetchElectricData } = useStore("electricBill");
const { electricAccount } = useStore("electricAccount");
const { updateResident } = useStore("resident");

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const isUtilityLinkError = ref(false);

async function connectedAccount(accountData: any) {
	console.log("Connected account", accountData);
	try {
		const { error } = await supabase
			.from("ElectricAccount")
			.update({
				accountNumber: accountData.accountNumber.replaceAll("-", ""),
				isAccountLinkedWithUtility: true,
				status: ElectricStatus.ACTIVE,
			})
			.eq("id", electricAccount.value.id);
		if (error) {
			console.log("Error updating utility account", error);
			isUtilityLinkError.value = true;
		}

		await updateResident({ isRegistrationComplete: true }, false);

		fetchElectricData();
	} catch (error) {
		console.log("Error updating utility account", error);
	}
}

const isUsageInfoModalOpen = ref(false);
function closeUsageInfoModal() {
	isUsageInfoModalOpen.value = false;
}

const isGreenButtonRedirectOpen = ref(false);
function closeGreenButtonRedirect() {
	isGreenButtonRedirectOpen.value = false;
}

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I am having issues connecting my utility account to Cottage.");
}
function resetUtilityAccountLink() {
	electricAccount.value.isAccountLinkedWithUtility = false;
	isUtilityLinkError.value = false;
}
</script>
