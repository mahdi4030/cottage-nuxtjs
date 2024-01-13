<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex text-center md:p-12 max-w-2xl">
					<h2 class="pb-8">Create New Password</h2>
					<div class="text-xl">Enter your new password</div>
					<div class="text-base italic text-center mt-1">Passwords must be at least 8 characters in length</div>
					<div class="flex flex-col items-center md:flex-start justify-between w-full">
						<BaseInput
							v-model="newPassword"
							class="w-full flex text-left mt-4"
							input-class=""
							input-control="flex"
							input-name="newPassword"
							input-type="password"
						>
							New Password
						</BaseInput>
						<BaseInput
							v-model="newPasswordConfirm"
							class="w-full flex text-left mt-2"
							input-class=""
							input-control="flex"
							input-name="newPasswordConfirm"
							input-type="password"
						>
							Confirm New Password
						</BaseInput>
						<div
							v-if="passwordResetError"
							class="flex text-rose-600 mt-4 text-lg items-center px-4 py-2 text-left bg-rose-50 border-2 border-rose-600 rounded-xl w-full max-w-2xl"
						>
							<nuxt-icon name="warning" class="min-w-fit text-xl pr-2" filled />
							{{ passwordResetMessage }}
						</div>
						<BaseButton
							btn-size="large"
							btn-style="w-full"
							btn-type="primary"
							class="w-full flex pt-6"
							:is-disabled="isResetDisabled"
							@click="setNewPassword"
						>
							Set New Password
						</BaseButton>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const newPassword = ref("");
const newPasswordConfirm = ref("");
const services = useAuth();
const currentTimestamp = Math.round(new Date().getTime() / 1000);
const route = useRoute();
const { userId, secret, expire } = route.query;

const passwordResetError = ref(false);
const passwordResetMessage = ref("Both passwords must match.");

definePageMeta({
	layout: "external",
});

onBeforeMount(() => {
	if (currentTimestamp > parseInt(expire.toString())) {
		navigateTo("/forgot-password?error=expired");
	}
});

const isResetDisabled = computed(() => {
	if (newPassword.value.length < 8 || newPasswordConfirm.value.length < 8) {
		return true;
	}
	return false;
});

async function setNewPassword() {
	passwordResetError.value = false;
	if (newPassword.value.length < 8) {
		passwordResetError.value = true;
		passwordResetMessage.value = "Password must be over 8 characters";
	} else if (newPassword.value !== newPasswordConfirm.value) {
		passwordResetError.value = true;
		passwordResetMessage.value = "Both passwords must match.";
	} else {
		const recoverySuccess = await services.confirmRecovery(userId.toString(), secret.toString(), newPassword.value, newPasswordConfirm.value);
		if (recoverySuccess) {
			navigateTo("/app");
		} else {
			// Todo: To refine failed login UX
			passwordResetMessage.value = "Something went wrong. Please try again.";
		}
	}
}
</script>
