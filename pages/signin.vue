<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-28 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex flex-col text-center justify-center items-center md:p-12 max-w-xl w-full">
					<h2 class="pb-8">Sign In</h2>
					<div class="flex flex-row items-center md:flex-start justify-between w-full">
						<!-- <BaseButton btnType="logo" @click="createOAuthSession('apple')" class="w-full px-2 pt-2" btnSize="large" btnStyle="px-4">
              <nuxt-icon name="icon-apple-black" class="min-w-fit text-2xl" filled />
            </BaseButton> -->
						<BaseButton btn-type="logo" class="w-full px-2 pt-2" btn-size="large" btn-style="px-4" @click="createOAuthSession('google')">
							<nuxt-icon name="icon-google" class="min-w-fit text-2xl" filled />
						</BaseButton>
						<BaseButton
							btn-type="logo"
							class="w-full px-2 pt-2"
							btn-size="large"
							btn-style="px-4"
							@click="createOAuthSession('facebook')"
						>
							<nuxt-icon name="icon-facebook" class="min-w-fit text-2xl" filled />
						</BaseButton>
					</div>
					<div v-if="hasErrorsOauth" class="text-rose-600 my-2 max-w-2xl">There was a problem logging in, please try another method</div>
					<div class="w-full mt-5">
						<div class="relative flex py-3 items-center">
							<div class="flex-grow border-t border-border"></div>
							<span class="flex-shrink mx-4 text-forrest-700 font-semibold">Or</span>
							<div class="flex-grow border-t border-border"></div>
						</div>
					</div>
					<div class="flex flex-col items-center md:flex-start justify-between w-full px-2">
						<BaseInput
							v-model="signInEmail"
							subtext="Invalid email"
							:has-errors="hasErrorsEmail || hasErrorsPassword"
							:show-subtext="hasErrorsEmail"
							class="w-full flex text-left mt-2"
							autocomplete="email"
							input-name="signInEmail"
							input-control="flex"
						>
							Email
						</BaseInput>
						<BaseInput
							v-model="signInPassword"
							subtext="Invalid login details, please try again"
							:has-errors="hasErrorsPassword"
							:show-subtext="hasErrorsPassword"
							class="w-full flex text-left mt-2"
							input-type="password"
							autocomplete="current-password"
							input-name="signInPassword"
							input-control="flex"
						>
							Password
						</BaseInput>
						<!-- <BaseButton btn-type="primary" class="w-full flex pt-6" btn-style="w-full" btn-size="large" @click="login">
							Sign In
						</BaseButton> -->
						<BaseButton
							class="w-full flex pt-6"
							btn-size="large"
							:btn-style="[
								'w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
								startLoginForm ? 'cursor-not-allowed' : '',
							]"
							@click="login"
						>
							<div v-if="!startLoginForm">Sign In</div>
							<div v-if="startLoginForm" class="inline-flex items-center space-x-2">
								<svg class="animate-spin -mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								<span>Processing...</span>
							</div>
						</BaseButton>
					</div>
					<div class="text-green-700 mt-8 text-xl font-semibold max-w-2xl underline">
						<nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { validateEmail } from "~~/utils/validation";
import { Resident } from "~/types/Resident";
import { User } from "@supabase/gotrue-js";
const { getResident } = useStore("resident");
const { occupancy, getOccupancy } = useStore("occupancy");
const { fetchElectricData } = useStore("electricBill");

const route = useRoute();
const { oauthFail } = route.query;

const signInEmail = ref("");
const signInPassword = ref("");
const hasErrorsEmail = ref(false);
const hasErrorsPassword = ref(false);
const hasErrorsOauth = ref(false);
const startLoginForm = ref(false);

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const { registration } = useStore("registration");

definePageMeta({
	layout: "external",
	middleware: async () => {
		const user = useSupabaseUser();
		if (user.value) {
			return navigateTo("/app/overview");
		}
	},
});

onBeforeMount(async () => {
	if (oauthFail) {
		hasErrorsOauth.value = true;
	}
});

async function login() {
	startLoginForm.value = true;
	hasErrorsEmail.value = false;
	hasErrorsPassword.value = false;
	hasErrorsOauth.value = false;

	if (validateEmail(signInEmail.value)) {
		try {
			await useAuth().login(signInEmail.value, signInPassword.value);
		} catch (error) {
			hasErrorsPassword.value = true;
			useResetOnboarding();
			console.log(error);
			startLoginForm.value = false;
		}
	} else {
		hasErrorsEmail.value = true;
		startLoginForm.value = false;
	}
}

// eslint-disable-next-line no-undef
watchEffect(async () => {
	const route = useRoute();
	if (user.value) {
		try {
			console.log(user);
			await Promise.all([getOccupancy(), getResident()]);
			fetchElectricData();
			return navigateTo("/app/overview");
		} catch (error) {
			// TODO: Handle error here if API fails
			console.log(error);
			await useAuth().logout();
			return navigateTo("/no-account");
		}
	}
});

async function createOAuthSession(provider: string) {
	hasErrorsOauth.value = false;
	try {
		await useAuth().createOAuthSession(provider);
	} catch (err) {
		console.log(err);
		hasErrorsOauth.value = true;
	}
}
</script>

<style lang="sass" scoped></style>
