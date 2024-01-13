<template>
	<div>
		<ClientOnly>
			<ModalAction
				:is-modal-open="isConfirmDeleteAccountOpen"
				confirm-button-text="Delete My Account"
				@cancel-action="closeConfirmDeleteAccount"
				@confirm-action="deleteAccount"
			>
				<template #header>Are you sure you want to delete your account?</template>
				<template #body>
					<div class="flex flex-col mx-auto text-center">
						<div class="text-lg text-textblack">To delete your account, you will need to send us an email.</div>
						<div class="text-lg text-textblack">All of your data will be permanently removed.</div>
					</div>
				</template>
			</ModalAction>
		</ClientOnly>
		<ClientOnly>
			<BaseTabsContainer>
				<BaseTabsTab id="account" name="Account" :callback="() => {}">
					<ElementsCard class="w-full p-6 md:!p-8">
						<div>
							<div class="text-xl font-bold text-textblack">Personal Information</div>
							<div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
								<div class="sm:col-span-3">
									<BaseInput
										v-model="baseResident.firstName"
										autocomplete="given-name"
										class="w-full flex text-left mt-4"
										input-name="firstName"
										input-control="flex"
										subtext="First name cannot be blank"
										:has-errors="hasErrorsFirstName || hasErrorsResident"
										:show-subtext="hasErrorsFirstName"
									>
										First Name
									</BaseInput>
								</div>
								<div class="sm:col-span-3">
									<BaseInput
										v-model="baseResident.lastName"
										autocomplete="family-name"
										class="w-full flex text-left mt-4"
										input-control="flex"
										input-name="lastName"
										subtext="Last name cannot be blank"
										:has-errors="hasErrorsLastName || hasErrorsResident"
										:show-subtext="hasErrorsLastName"
									>
										Last Name
									</BaseInput>
								</div>
								<div class="sm:col-span-3">
									<BaseInput
										v-model="user.email"
										autocomplete="email"
										class="w-full flex text-left mt-4"
										input-name="email"
										input-control="flex"
										subtext="Invalid email"
										:has-errors="hasErrorsEmail || hasErrorsResident"
										:show-subtext="hasErrorsEmail"
									>
										Email
									</BaseInput>
								</div>
								<div class="sm:col-span-3">
									<BaseInput
										ref="phoneInput"
										v-model="baseResident.phone"
										class="w-full flex text-left mt-4"
										input-name="phone"
										:cleave-options="{
											blocks: [3, 3, 4],
											delimiters: ['-', '-'],
											numericOnly: true,
										}"
									>
										Phone
									</BaseInput>
								</div>
							</div>
						</div>
						<div class="my-2">
							<nuxt-link class="text-xl text-green-700 underline" :to="'/forgot-password?email=' + user.email"
								>Forgot Password?</nuxt-link
							>
						</div>
						<div class="flex justify-end pt-2">
							<BaseButton btn-size="base" btn-style="w-full" btn-type="line" class="flex" @click="resetForm">Cancel</BaseButton>
							<BaseButton btn-size="base" btn-style="w-full" btn-type="primary" class="flex pl-2" @click="saveResidentUpdate">
								Save
							</BaseButton>
						</div>
					</ElementsCard>
					<ElementsCard class="w-full p-6 md:!p-8 mt-3">
						<div class="">
							<div class="text-xl font-bold text-textblack pb-2">Delete Cottage Account</div>
							<p>While we hate to see you go, we definitely understand that you might want to delete your account with Cottage.</p>
						</div>
						<div class="flex justify-end">
							<div>
								<BaseButton
									btn-size="base"
									btn-style="w-full"
									btn-type="warning"
									class="flex pt-6"
									@click="isConfirmDeleteAccountOpen = true"
									>Delete Account</BaseButton
								>
							</div>
						</div>
					</ElementsCard>
				</BaseTabsTab>
				<BaseTabsTab id="utility-account" name="Utility Account" :callback="() => {}">
					<ElementsCard class="w-full p-6 md:!p-8">
						<div class="text-xl font-bold text-textblack pb-1">Utility Account</div>
						<p>Your utility account helps us find savings and know how much renewable energy to buy.</p>
						<div class="flex flex-col w-full">
							<UtilityConnectForm />
						</div>
					</ElementsCard>
				</BaseTabsTab>
				<BaseTabsTab id="referrals" name="Referrals" :callback="() => {}">
					<ElementsCard class="w-full p-6 md:!p-8">
						<div class="text-xl font-bold text-textblack pb-1">Your Code</div>
						<p>
							Share your code - for every 5 friends that sign-up using your code,
							<b>we give you ${{ serviceGroup.referralProgramAmount }}</b
							>!
						</p>
						<div class="mb-8 flex flex-col w-full">
							<div class="flex flex-col md:flex-row items-center md:space-x-4 space-x-0 space-y-2 md:space-y-0 pt-2">
								<div class="flex justify-center pt-1">
									<ClientOnly>
										<div
											v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyReferralOpen,
												theme: 'dark',
												triggers: [],
											}"
											class="text-xl font-semibold bg-green-50 rounded-xl justify-center leading-tight px-4 py-3 flex space-x-2 cursor-pointer hover:bg-green-100/70"
											@click="copyReferralCode()"
										>
											<span>
												{{ referralCode }}
											</span>
											<nuxt-icon name="copy" filled />
										</div>
									</ClientOnly>
								</div>
								<div class="flex flex-row justify-center space-x-4 pt-2">
									<ClientOnly>
										<BaseButton
											v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyMessage,
												theme: 'dark',
												triggers: [],
											}"
											btn-type="line"
											btn-size="base"
											@click="createTextMessage"
										>
											<nuxt-icon class="text-3xl" name="message" filled />
										</BaseButton>
										<BaseButton btn-type="line" btn-size="base" @click="createMailTo">
											<nuxt-icon class="text-3xl" name="email" filled />
										</BaseButton>
										<BaseButton
											v-tooltip="{
												content: 'Copied to clipboard!',
												shown: isCopyLinkOpen,
												theme: 'dark',
												triggers: [],
											}"
											btn-type="line"
											btn-size="base"
											@click="copyURL()"
										>
											<nuxt-icon class="text-3xl" name="link" filled />
										</BaseButton>
									</ClientOnly>
								</div>
							</div>
						</div>
						<div class="text-xl font-bold text-textblack pb-1">Your Referrals</div>
						<p>Anyone who uses your referral code when signing up to Cottage will appear here</p>
						<div class="mt-2 ring-1 ring-border md:mx-0 rounded-lg">
							<table class="min-w-full divide-y divide-border">
								<thead>
									<tr>
										<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textblack sm:pl-6">User</th>
										<th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
											Status
										</th>
										<th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
											Date
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(referral, refIndex) in referrals" :key="referral.createdAt">
										<td :class="[refIndex === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 sm:pl-6 pr-3 text-sm']">
											<div class="text-lg text-textblack">{{ referral.firstName }} {{ referral.lastName }}</div>
											<div v-if="refIndex !== 0" class="absolute right-0 left-6 -top-px h-px bg-gray-200" />
										</td>
										<td
											:class="[
												refIndex === 0 ? '' : 'border-t border-gray-200',
												'hidden px-3 py-3.5 text-gray-500 lg:table-cell',
											]"
										>
											<BaseBadge :badge-style="statusMap[referral.referralStatus]">
												{{ referral.referralStatus }}
											</BaseBadge>
										</td>
										<td
											:class="[
												refIndex === 0 ? '' : 'border-t border-transparent',
												'relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-medium',
											]"
										>
											{{ new Date(referral.createdAt).toLocaleDateString() }}
											<div v-if="refIndex !== 0" class="absolute right-6 left-0 -top-px h-px bg-gray-200" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</ElementsCard>
				</BaseTabsTab>
			</BaseTabsContainer>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
const defaultResident = {
	firstName: "",
	lastName: "",
	phone: "",
};

const statusMap = {
	complete: "success",
	pending: "",
	invalid: "error",
};

const hasErrorsResident = ref(false);
const hasErrorsFirstName = ref(false);
const hasErrorsLastName = ref(false);
const hasErrorsEmail = ref(false);
const baseResident = ref({ ...defaultResident });
const phoneInput = ref(null);

const config = useRuntimeConfig();
const authServices = useAuth();
const { resident, updateResident } = useStore("resident");
const { getReferralCode, referralCode } = useStore("cottageUser");
const { occupancy, getOccupancy } = useStore("occupancy");
const { serviceGroup } = useStore("regServices");
const { referrals, fetchReferrals } = useStore("referrals");

const { addToastToQueue } = useToast();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isConfirmDeleteAccountOpen = ref(false);
function closeConfirmDeleteAccount() {
	isConfirmDeleteAccountOpen.value = false;
}
function deleteAccount() {
	window.location.href = "mailto:support@energybycottage.com";
}

onMounted(async () => {
	baseResident.value.firstName = resident.value.firstName ?? "";
	baseResident.value.lastName = resident.value.lastName ?? "";
	baseResident.value.phone = resident.value.phone ?? "";
	await getReferralCode(user.value.id);
	await fetchReferrals(user.value.id);
	console.log(referrals.value);
	phoneInput.value?.$el.getElementsByTagName("input")[0].cleave.setRawValue(resident.value.phone);
});

async function saveResidentUpdate() {
	try {
		await updateResident(baseResident.value);
		addToastToQueue({
			message: "Successfully updated your profile",
			type: "success",
		});
	} catch (err) {
		addToastToQueue({
			message: "Something went wrong. Please try again later.",
			type: "warning",
		});
	}
}

function resetForm() {
	Object.assign(baseResident, useUtils().updateObject(baseResident.value, resident.value));
	phoneInput.value?.$el.getElementsByTagName("input")[0].cleave.setRawValue(resident.value.phone);
}

const isCopyReferralOpen = ref(false);
const isCopyLinkOpen = ref(false);
const isCopyMessage = ref(false);

function createTextMessage() {
	const bodyString =
		"I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month.%20Give%20them%20at%20try%21%0A%0A" +
		config.SITE_URL +
		"/ref/" +
		referralCode.value;
	if (navigator.userAgent.match(/iPhone/i)) {
		window.open("sms://?/&body=" + bodyString);
	} else if (navigator.userAgent.match(/Android/i)) {
		window.open("sms://?/?body=" + bodyString);
	} else {
		navigator.clipboard.writeText(
			"I just signed up with Cottage to manage my electricity account. They are saving me 10% on my electricity bill every month. Give them at try!" +
				config.SITE_URL +
				"/ref/" +
				referralCode.value,
		);
		isCopyMessage.value = true;
		setTimeout(() => {
			isCopyMessage.value = false;
		}, 1500);
	}
}

function createMailTo() {
	const mailString =
		"mailto:?subject=Check-out%20Cottage!&body=I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month%20and%20are%20providing%20green%20energy%20for%20the%20cost%20of%20a%20cup%20of%20coffee.%20%0A%0AGive%20them%20at%20try%21%0A" +
		config.SITE_URL +
		"/ref/" +
		referralCode.value;
	window.location.href = mailString;
}

function copyURL() {
	navigator.clipboard.writeText(config.SITE_URL + "/ref/" + referralCode.value);
	isCopyLinkOpen.value = true;
	setTimeout(() => {
		isCopyLinkOpen.value = false;
	}, 1500);
}
function copyReferralCode() {
	navigator.clipboard.writeText(referralCode.value);
	isCopyReferralOpen.value = true;
	setTimeout(() => {
		isCopyReferralOpen.value = false;
	}, 1500);
}

definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});
</script>
