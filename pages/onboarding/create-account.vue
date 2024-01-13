<template>
	<div class="flex flex-col container m-auto items-center xl:max-w-6xl">
		<OnboardingModalAuthRep :is-open="isAuthorizedRepOpen" @closeAction="closeAuthorizedRepOpen" />
		<h2 class="text-center leading-tight">Let’s setup your account 🔨</h2>
		<ElementsOnboardingCard>
			<div class="max-w-xl w-full">
				<div class="full pb-4 md:pb-6">
					<p class="text-center">Make sure to enter your legal name.</p>
					<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
						<div class="sm:col-span-3">
							<BaseInput
								v-model="registration.resident.firstName"
								class="w-full flex text-left mt-2"
								input-name="firstName"
								input-control="flex"
								subtext="Enter a valid first name"
								:has-errors="hasFirstNameErrors"
								:show-subtext="hasFirstNameErrors"
							>
								First Name
							</BaseInput>
						</div>
						<div class="sm:col-span-3">
							<BaseInput
								v-model="registration.resident.lastName"
								class="w-full flex text-left mt-2"
								input-name="lastName"
								input-control="flex"
								subtext="Enter a valid last name"
								:has-errors="hasLastNameErrors"
								:show-subtext="hasLastNameErrors"
							>
								Last Name
							</BaseInput>
						</div>
					</div>
				</div>
				<div class="w-full">
					<div class="relative flex items-center">
						<div class="flex-grow border-t border-border"></div>
						<span class="flex-shrink mx-4 text-forrest-700 text-lg font-semibold">Sign up with</span>
						<div class="flex-grow border-t border-border"></div>
					</div>
				</div>
				<div class="flex items-center md:flex-row md:flex-start justify-between w-full">
					<!-- <BaseButton btnType="logo" @click="createAccountWithOAuth('apple')" class="w-full px-2 pt-2" btnSize="large">
            <nuxt-icon name="icon-apple-black" class="min-w-fit text-2xl" filled />
          </BaseButton> -->
					<BaseButton btn-type="logo" class="w-full px-2 pt-2" btn-size="large" @click="createAccountWithOAuth('google')">
						<nuxt-icon name="icon-google" class="min-w-fit text-2xl" filled />
					</BaseButton>
					<BaseButton btn-type="logo" class="w-full px-2 pt-2" btn-size="large" @click="createAccountWithOAuth('facebook')">
						<nuxt-icon name="icon-facebook" class="min-w-fit text-2xl" filled />
					</BaseButton>
				</div>
				<div v-if="hasErrorsOauth" class="text-rose-600 my-2 max-w-2xl">There was a problem logging in, please try another method</div>
				<div class="w-full mt-4">
					<div class="relative flex py-2 items-center">
						<div class="flex-grow border-t border-border"></div>
						<span class="flex-shrink mx-4 text-forrest-700 text-lg font-semibold">Or manually</span>
						<div class="flex-grow border-t border-border"></div>
					</div>
				</div>
				<form autocomplete="off">
					<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
						<input style="display: none" type="text" name="fakeusername" />
						<input style="display: none" type="password" name="fakepassword" autocomplete="current-password" />
						<div class="sm:col-span-6">
							<BaseInput
								v-model="email"
								:subtext="emailErrorMessage"
								:has-errors="hasEmailError || hasPasswordError"
								:show-subtext="hasEmailError"
								class="w-full flex text-left mt-2"
								autocomplete="email"
								input-name="email"
								input-control="flex"
							>
								Email
							</BaseInput>
						</div>
						<div v-if="showSignInLink" class="sm:col-span-6 pb-2 pt-2 text-left text-lg">
							<a class="text-green-700 font-semibold underline cursor-pointer" href="/signin">Try signing in</a>
							instead?
						</div>
						<div class="sm:col-span-6">
							<BaseInput
								v-model="password"
								:subtext="passwordErrorMessage"
								:has-errors="hasPasswordError"
								:show-subtext="hasPasswordError"
								class="w-full flex text-left mt-2"
								input-type="password"
								autocomplete="off"
								input-name="password"
								input-control="flex"
							>
								Password (min 8 characters)
							</BaseInput>
							<!-- <div class="text-sm italic text-left text-textblack/80">Must be at least 8 characters in length</div> -->
						</div>
					</div>
				</form>
			</div>
			<div class="flex flex-row pt-4">
				<input
					id="terms-conditions"
					v-model="termsAndConditions"
					class="form-checkbox text-green-700 w-8 h-8 mr-2 focus:ring-green-700 focus:ring-opacity-25 border border-gray-300 rounded-3xl"
					aria-describedby="terms-conditions-description"
					name="terms-conditions"
					type="checkbox"
				/>
				<div class="text-sm text-textblack/80" :class="[hasTermsAndConditionsError ? '!text-rose-700 font-semibold' : '']">
					I agree to the
					<a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a>,
					<a href="/privacy-policy" target="_blank" class="underline">Privacy Policy</a>, and authorize Cottage Energy to act as an
					<span class="underline" @click="isAuthorizedRepOpen = true">Authorized Rep</span>.
				</div>
			</div>
		</ElementsOnboardingCard>
		<div class="container lg:px-6 pt-4 md:py-4">
			<FormNavigation
				:is-next-disabled="isNextDisabled"
				:processing-request="isProcessingAccountCreation"
				processing-request-text="One sec..."
				next-button-text="Create Account"
				nav-btn-style="px-12 lg:px-16 py-3 lg:py-4 text-lg lg:text-xl"
				@nextPage="nextPage"
				@previousPage="previousPage"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { validateEmail } from "~~/utils/validation";
const email = ref("");
const password = ref("");
const termsAndConditions = ref(false);

const hasFirstNameErrors = ref(false);
const hasLastNameErrors = ref(false);
const showSignInLink = ref(false);

const hasEmailError = ref(false);
const hasTermsAndConditionsError = ref(false);
const emailErrorMessage = ref("Enter a valid email");
const hasPasswordError = ref(false);
const passwordErrorMessage = ref("Password must be 8 characters, please try again");
const hasErrorsOauth = ref(false);

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const auth = useAuth();
const { registration, createRegistration } = useStore("registration");
const { checkRequiredFields, navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();
const config = useRuntimeConfig();

const isCreatingAccount = ref(false);
const isProcessingAccountCreation = ref(false);

const isNextDisabled = computed(() => {
	console.log(termsAndConditions.value);
	if (!checkRequiredFields() && email.value.length > 5 && password.value.length >= 8 && termsAndConditions.value) {
		return false;
	}
	return true;
});

const isAuthorizedRepOpen = ref(false);
function closeAuthorizedRepOpen() {
	isAuthorizedRepOpen.value = false;
}

async function createAccountWithOAuth(provider) {
	hasFirstNameErrors.value = false;
	hasLastNameErrors.value = false;
	if (registration.value.resident.firstName === undefined || registration.value.resident.firstName.length < 3) {
		hasFirstNameErrors.value = true;
		return;
	}
	if (registration.value.resident.lastName === undefined || registration.value.resident.lastName.length < 3) {
		hasLastNameErrors.value = true;
		return;
	}
	if (!termsAndConditions.value) {
		hasTermsAndConditionsError.value = true;
		return;
	}
	try {
		await auth.createOAuthSession(provider, "/onboarding/oauth-success");
	} catch (err) {
		hasEmailError.value = true;
		emailErrorMessage.value = "Something went wrong...";
	}
}

async function nextPage() {
	let formErrors = false;

	hasFirstNameErrors.value = false;
	hasLastNameErrors.value = false;
	hasEmailError.value = false;
	showSignInLink.value = false;

	if (registration.value.resident.firstName.length < 3) {
		hasFirstNameErrors.value = true;
		formErrors = true;
	}

	if (registration.value.resident.lastName.length < 3) {
		hasLastNameErrors.value = true;
		formErrors = true;
	}

	if (!validateEmail(email.value)) {
		hasEmailError.value = true;
		formErrors = true;
	}

	if (!formErrors) {
		isProcessingAccountCreation.value = true;
		try {
			console.log("Creating account...", email.value, password.value);
			await auth.createAccount(email.value, password.value);
		} catch (error) {
			isProcessingAccountCreation.value = false;
			console.log(error);
			hasEmailError.value = true;
			emailErrorMessage.value = error.message;
		}
	}
}

watch(
	() => user.value,
	async () => {
		if (user.value) {
			if (!isCreatingAccount.value) {
				isCreatingAccount.value = true;
				try {
					await createRegistration(user.value);
					return navigateTo("/app/overview");
				} catch (error) {
					// TODO: Handle error here if API fails
					console.log(error);
					hasEmailError.value = true;
					emailErrorMessage.value = error.message;
					isCreatingAccount.value = false;
				}
			}
		}
	},
);

function previousPage() {
	navigateToPreviousPage();
}
</script>
