<template>
	<div class="flex flex-col">
		<div class="flex">
			<div class="text-center sm:mt-0 w-full relative">
				<div v-if="innerStep == 1" class="flex flex-col w-full items-center">
					<p class="text-center pt-4">
						Enter your <b>{{ serviceGroup.electricCompanyID.name }}</b> login credentials. <br />
						We always keep your data safe and secure.
					</p>
					<p v-if="hasCredentialError" class="text-rose-600 pt-4 max-w-2xl">
						That combination of username / password did not work. Try again.
					</p>
					<form class="w-full max-w-sm pt-4" autocomplete="off">
						<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
							<input style="display: none" type="text" name="fakeusername" />
							<input style="display: none" type="password" name="fakepassword" autocomplete="current-password" />
							<div class="sm:col-span-6">
								<BaseInput
									v-model="utilityUsername"
									:has-errors="hasCredentialError"
									class="w-full flex text-left mt-2"
									autocomplete="email"
									input-name="utilityUsername"
									input-control="flex"
								>
									Username
								</BaseInput>
							</div>
							<div class="sm:col-span-6">
								<BaseInput
									v-model="utilityPassword"
									:has-errors="hasCredentialError"
									class="w-full flex text-left mt-2"
									input-type="password"
									autocomplete="off"
									input-name="utilityPassword"
									input-control="flex"
								>
									Password
								</BaseInput>
							</div>
						</div>
					</form>
					<BaseButton
						btn-size="large"
						:btn-style="['w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150']"
						btn-type="primary"
						class="flex w-full md:w-1/2 mt-4"
						@click="linkAccounts()"
						><nuxt-icon name="lock" class="text-base mr-2 -mt-[5px]" />
						<span>Link</span>
					</BaseButton>
				</div>
				<div v-if="innerStep == 2">
					<p class="pt-4">
						Connecting securely to <b>{{ serviceGroup.electricCompanyID.name }}</b>
					</p>
					<div class="flex flex-row py-6 justify-center">
						<div class="h-2 rounded-full bg-green-200 z-50 w-full max-w-md relative">
							<span class="bg-green-700 left-0 top-0 bottom-0 absolute rounded-full" :style="'width:' + progressPercent + '%'"></span>
						</div>
					</div>
					<p>Please do not close this screen while we work in the background 🙏</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const { serviceGroup } = useStore("regServices");
const { registration } = useStore("registration");
const { electricAccount } = useStore("electricAccount");

const utilityUsername = ref("");
const utilityPassword = ref("");
const innerStep = ref(1);
const progress = ref(0);
const progressPercent = ref(0);
const interval = ref(null);
const hasCredentialError = ref(false);

const emit = defineEmits(["connectedAccount", "cancelAction"]);

const user = useSupabaseUser();

async function linkAccounts() {
	innerStep.value = 2;
	hasCredentialError.value = false;
	interval.value = setInterval(() => {
		if (progress.value >= 1000) {
			clearInterval(interval.value);
		} else {
			progress.value++;
			progressPercent.value = (progress.value / 1000) * 100;
		}
	}, 10);
	const requestBody = {
		provider: serviceGroup.value.electricCompanyID.id.toLowerCase(),
		username: utilityUsername.value,
		password: utilityPassword.value,
		userId: user.value.id,
	};
	try {
		const accountData = await $fetch("/api/utility-connect/link", {
			method: "post",
			body: requestBody,
		});
		electricAccount.value.accountNumber = accountData.accountNumber;
		electricAccount.value.isAccountLinkedWithUtility = true;
		emit("connectedAccount", accountData);
		clearInterval(interval.value);
		progress.value = 0;
		progressPercent.value = 0;
	} catch (error) {
		console.log(error);
		innerStep.value = 1;
		hasCredentialError.value = true;
		progress.value = 0;
		progressPercent.value = 0;
	}
}

onUnmounted(() => {
	clearInterval(interval.value);
	progress.value = 0;
	progressPercent.value = 0;
});

function cancelAction() {
	clearInterval(interval.value);
	emit("cancelAction");
}
</script>
