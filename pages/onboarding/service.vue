<template>
	<div class="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
		<ModalInfo :is-modal-open="isApplicationTypeModalOpen" @closeModal="closeApplicationTypeModal">
			<template #header>
				<div class="whitespace-pre-line">
					{{ modalTitle }}
				</div>
			</template>
			<template #body>
				<div class="flex flex-col py-4 mx-auto text-center">
					<div class="flex flex-row py-4 whitespace-pre-line text-lg md:text-xl mx-auto">
						<div v-html="modalBody"></div>
					</div>
				</div>
			</template>
		</ModalInfo>
		<div class="w-full flex flex-col items-center">
			<h2 class="text-center leading-tight">Good to go 🎉 How can we help?</h2>
			<ElementsOnboardingCard>
				<div>
					<p class="text-center">
						Based on your address, your utility company is
						<b>{{ serviceGroup.electricCompanyID?.name }}</b
						>. This won’t change with Cottage.
					</p>
					<div class="flex flex-row items-center justify-center">
						<RadioGroup v-model="registration.accountType">
							<div class="mt-4 flex flex-col md:flex-row space-x-0 md:space-x-8 items-center justify-center space-y-4 md:space-y-0">
								<RadioGroupOption
									v-for="radioOption in radioOptions"
									:key="radioOption.id"
									v-slot="{ checked, active }"
									v-tooltip="!radioOption.enabled && toolTipOptions"
									as="template"
									:value="radioOption.id"
									:disabled="!radioOption.enabled"
								>
									<div>
										<div
											:class="[
												checked ? 'border-green-700  ring-2 ring-green-700' : 'border-border',
												!radioOption.enabled ? '!bg-gray-100 pointer-events-none' : '',
												'relative bg-white border rounded-lg shadow-sm px-4 pt-6 pb-4 cursor-pointer focus:outline-none hover:border-green-700 flex flex-col justify-center items-center w-full md:w-80',
											]"
										>
											<div class="flex flex-col items-center mb-2">
												<div><nuxt-icon :name="radioOption.icon" filled style="font-size: 3rem" /></div>
												<p class="block text-textblack pt-4 text-center leading-7">
													{{ radioOption.title }}
												</p>
											</div>
											<div
												:class="[
													checked ? 'bg-green-700 border-green-700' : 'bg-transparent border-border',
													'h-7 w-7 border-solid border rounded-full flex items-center justify-center absolute top-4 right-4',
												]"
												aria-hidden="true"
											>
												<nuxt-icon v-show="checked" name="check" filled class="text-lg" />
											</div>
											<span
												:class="[
													active ? 'border-2' : 'border-2',
													checked ? 'border-green-700' : 'border-transparent',
													!radioOption.enabled ? 'pointer-events-none' : '',
													'absolute -inset-px rounded-lg hover:border-green-700',
												]"
												aria-hidden="true"
											/>
										</div>
										<div class="pt-3 w-full flex items-center justify-center">
											<RadioGroupLabel
												as="span"
												class="block text-base md:text-lg font-semibold underline text-green-700 cursor-pointer"
												@click.stop.prevent="openModal(radioOption.id)"
											>
												Is this option right for me?
											</RadioGroupLabel>
										</div>
									</div>
								</RadioGroupOption>
							</div>
						</RadioGroup>
					</div>
				</div>
				<div v-if="registration.accountType === RegistrationAccountType.NEW" class="flex flex-col pt-6 w-full">
					<div class="flex flex-col w-full items-center">
						<p class="pb-2 text-center">
							When you sign-up with Cottage,
							<b>we take care of signing up with {{ serviceGroup.electricCompanyID?.name }}</b>
						</p>
						<div class="w-full md:w-1/2 mx-auto">
							<div class="flex flex-row w-full">
								<BaseInput
									ref="leaseStartInput"
									v-model="registration.resident.startServiceDate"
									input-name="startServiceDate"
									input-class="my-0"
									:cleave-options="{
										date: true,
										datePattern: ['m', 'd', 'Y'],
									}"
									:has-errors="hasErrorsStartServiceDate"
									:show-subtext="hasErrorsStartServiceDate"
									:subtext="startServiceErrorText"
								>
									Start Date
									<template #action>
										<div
											class="absolute z-10 top-3 right-4 text-green-700 font-bold text-lg cursor-pointer"
											@click="setTodaysDate"
										>
											Today
										</div>
									</template>
								</BaseInput>
							</div>
						</div>
					</div>
				</div>
				<div v-if="registration.accountType === RegistrationAccountType.EXISTING" class="flex flex-col pt-6 w-full">
					<div class="flex flex-col w-full items-center">
						<div class="text-lg md:text-xl pb-2 text-center">
							Cottage connects your existing account to
							<b>100% green energy for no extra cost</b> and works in the background to to find savings.
						</div>
					</div>
				</div>
			</ElementsOnboardingCard>
		</div>
		<div class="container lg:px-6 pt-4 md:py-4">
			<FormNavigation
				:is-next-disabled="isNextDisabled"
				:show-previous="true"
				next-button-text="Continue"
				nav-btn-style="py-3 lg:py-4 text-lg lg:text-xl"
				@next-page="nextPage"
				@previous-page="previousPage"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { differenceInDays } from "date-fns";
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { RegistrationAccountType } from "~~/types/Enums";
import { ComputedRef } from "vue";

const supabase = useSupabaseClient();
const { registration } = useStore("registration");
const { serviceGroup } = useStore("regServices");
const { checkRequiredFields, navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();

const isApplicationTypeModalOpen = ref(false);

const modalTitle = ref("");
const modalBody = ref("");
const leaseStartInput = ref(null);

const hasErrorsStartServiceDate = ref(false);
const startServiceErrorText = ref("Enter a valid date");

const toolTipOptions = computed(() => {
	return {
		content:
			"We can only help people online with existing electric accounts in your area, but we can help sign you up over the phone. Give us a call at (646) 847-7885",
		triggers: ["hover", "click"],
	};
});

function openModal(optionID: string) {
	const index = radioOptions.value.findIndex((arr) => {
		return arr.id === optionID;
	});
	console.log(radioOptions);
	const modalContent = radioOptions.value[index];
	console.log(modalContent);
	modalTitle.value = modalContent["modalTitle"];
	modalBody.value = modalContent["modalBody"];
	isApplicationTypeModalOpen.value = true;
}

function closeApplicationTypeModal() {
	isApplicationTypeModalOpen.value = false;
}

const isNextDisabled = computed(() => {
	if (registration.value.accountType === RegistrationAccountType.NONE) {
		return true;
	}
	return checkRequiredFields();
});

function nextPage() {
	hasErrorsStartServiceDate.value = false;
	startServiceErrorText.value = "Enter a valid date";

	if (registration.value.accountType === RegistrationAccountType.NEW) {
		const today = new Date();
		const startServiceDateString = registration.value.resident.startServiceDate;
		const startServiceDate = new Date(registration.value.resident.startServiceDate);

		if (startServiceDateString.length !== 10) {
			hasErrorsStartServiceDate.value = true;
		} else {
			const diffInDays = differenceInDays(startServiceDate, today);
			if (diffInDays >= 32) {
				startServiceErrorText.value = "Enter a date that is less than 1 month";
				hasErrorsStartServiceDate.value = true;
			} else if (diffInDays <= -1) {
				startServiceErrorText.value = "Enter a future date. If you have already started your lease, just click 'Today'.";
				hasErrorsStartServiceDate.value = true;
			}
		}

		if (hasErrorsStartServiceDate.value) {
			return;
		} else {
			navigateToNextPage();
		}
	} else {
		navigateToNextPage();
	}
}

function previousPage() {
	navigateToPreviousPage();
}

function setTodaysDate() {
	let todaysDate = new Date().toLocaleDateString("en-us", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	leaseStartInput.value.$el.getElementsByTagName("input")[0].cleave.setRawValue(todaysDate);
	registration.value.resident.startServiceDate = todaysDate;
}

interface RadioOption {
	id: string;
	title: string;
	icon: string;
	enabled: boolean;
	modalTitle: string;
	modalBody: string;
}

const radioOptions: ComputedRef<RadioOption[]> = computed(() => {
	return [
		{
			id: "NEW",
			title: "Sign me up for a new account with " + serviceGroup.value.electricCompanyID?.name,
			icon: "add-user",
			enabled: serviceGroup.value.electricCompanyID?.isHandleMoveIns,
			modalTitle: "Sign-up with a new electricity account",
			modalBody:
				// eslint-disable-next-line quotes
				'<div class="font-bold">Are you about to, or are you just moving into a new apartment/house\n and need to set up an electricity account?</div> \n \
      <div class="flex flex-row justify-center"><svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0009 21.3472C31.4447 20.1201 30.8061 18.7669 29.5747 18.3246C28.3434 17.8824 26.9848 18.5185 26.5408 19.7455C22.0782 31.4489 4.89971 28.481 4.68543 15.941C4.57757 7.92972 13.3421 2.22645 20.6433 5.80624C21.8328 6.35119 23.2403 5.83233 23.7873 4.64738C24.3344 3.46242 23.8137 2.05995 22.6244 1.515C20.4307 0.509644 18.1834 0 15.9448 0C-5.2834 0.876055 -5.27356 31.011 15.9448 31.8823C22.6705 31.8823 28.721 27.6486 31.0009 21.3472Z" fill="#194D3E"></path><path d="M17.7261 20.7826C16.105 20.7826 14.5829 20.146 13.44 18.9902L10.1004 15.584C9.18571 14.6509 9.20337 13.1558 10.1399 12.2443C11.0766 11.3331 12.5772 11.3506 13.4919 12.2836L16.8242 15.6826C17.0618 15.923 17.3847 16.0593 17.726 16.0593C18.0673 16.0593 18.3902 15.923 18.6351 15.6754L27.8902 6.36756C28.8112 5.44097 30.3121 5.43388 31.2423 6.35186C32.1724 7.26983 32.1794 8.76511 31.258 9.6917L22.0075 18.9948C20.8695 20.146 19.3472 20.7826 17.7261 20.7826V20.7826Z" fill="#18A57B"></path></svg>\
      <div class="pl-3">This option is for you.</div></div>\n \
      During the next steps, we’ll collect a couple of details so we can setup your new electricity account. We handle everything from signing you up to setting up your online account so you can have peace of mind and electricity on the day you move in.  \n\nIf you have any questions feel free to call <a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a> any time during the process',
		},
		{
			id: "EXISTING",
			title: "I have an electricity account and want Cottage to help manage it",
			icon: "briefcase-manage",
			enabled: true,
			modalTitle: "Cottage plugs into your existing account",
			modalBody:
				// eslint-disable-next-line quotes
				'<div class="font-bold">Do you have an electricity account with ' +
				serviceGroup.value.electricCompanyID?.name +
				// eslint-disable-next-line quotes
				' for your current apartment/house?</div>\n \
      <div class="flex flex-row justify-center"><svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0009 21.3472C31.4447 20.1201 30.8061 18.7669 29.5747 18.3246C28.3434 17.8824 26.9848 18.5185 26.5408 19.7455C22.0782 31.4489 4.89971 28.481 4.68543 15.941C4.57757 7.92972 13.3421 2.22645 20.6433 5.80624C21.8328 6.35119 23.2403 5.83233 23.7873 4.64738C24.3344 3.46242 23.8137 2.05995 22.6244 1.515C20.4307 0.509644 18.1834 0 15.9448 0C-5.2834 0.876055 -5.27356 31.011 15.9448 31.8823C22.6705 31.8823 28.721 27.6486 31.0009 21.3472Z" fill="#194D3E"></path><path d="M17.7261 20.7826C16.105 20.7826 14.5829 20.146 13.44 18.9902L10.1004 15.584C9.18571 14.6509 9.20337 13.1558 10.1399 12.2443C11.0766 11.3331 12.5772 11.3506 13.4919 12.2836L16.8242 15.6826C17.0618 15.923 17.3847 16.0593 17.726 16.0593C18.0673 16.0593 18.3902 15.923 18.6351 15.6754L27.8902 6.36756C28.8112 5.44097 30.3121 5.43388 31.2423 6.35186C32.1724 7.26983 32.1794 8.76511 31.258 9.6917L22.0075 18.9948C20.8695 20.146 19.3472 20.7826 17.7261 20.7826V20.7826Z" fill="#18A57B"></path></svg>\
      <div class="pl-3">This option is for you.</div></div>\n \
      After creating an account with Cottage, we connect you with 100% renewable energy and work in the background to find the best energy suppliers and incentives for your area.  \n\nIf you have any questions feel free to call <a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a> any time during the process',
		},
	];
});
</script>
