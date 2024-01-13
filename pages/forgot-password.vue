<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl">
					<h2 class="pb-8">Forgot Password</h2>
					<div class="text-forrest-700 text-xl">
						Enter the email address for your account. A link will be sent to your email with further instructions.
					</div>
					<div class="flex flex-col items-center md:flex-start justify-between w-full">
						<BaseInput
							v-model="forgotPasswordEmail"
							class="w-full flex text-left"
							input-class="pt-6"
							input-control="flex"
							input-name="forgotPasswordEmail"
							subtext="Sorry, we couldn’t find your email in our records"
							:has-errors="hasErrorsEmail"
							:show-subtext="hasErrorsEmail"
						>
							Email
						</BaseInput>
						<BaseButton
							btn-size="large"
							btn-style="w-full"
							btn-type="primary"
							class="w-full flex pt-6"
							:is-disabled="isSendDisabled"
							@click="recoverAccount"
						>
							Send Reset Link
						</BaseButton>
						<div v-if="hasGeneralError" class="my-2 text-rose-600">
							{{ errorMessage }}
						</div>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { validateEmail } from "~~/utils/validation";

const forgotPasswordEmail = ref("");
const errorMessage = ref("");
const services = useAuth();
const hasErrorsEmail = ref(false);
const hasGeneralError = ref(false);
const route = useRoute();
const { error, email } = route.query;

const isSendDisabled = computed(() => {
	if (forgotPasswordEmail.value.length <= 4) {
		return true;
	}
	return false;
});

onBeforeMount(() => {
	if (error) {
		switch (error) {
			case "expired":
				errorMessage.value = "The password reset link has expired, please try again";
				hasGeneralError.value = true;
				break;
		}
	}
});

onMounted(() => {
	if (email) {
		forgotPasswordEmail.value = email as string;
	}
});

definePageMeta({
	layout: "external",
});

async function recoverAccount() {
	hasGeneralError.value = false;
	hasErrorsEmail.value = false;

	if (validateEmail(forgotPasswordEmail.value)) {
		const recoveryRequestSuccess = await services.accountRecovery(forgotPasswordEmail.value);
		if (recoveryRequestSuccess) {
			navigateTo("/forgot-password-check-email");
		} else {
			hasErrorsEmail.value = true;
		}
	} else {
		hasErrorsEmail.value = true;
	}
}
</script>
