<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex flex-col text-center justify-center items-center md:p-12 max-w-2xl w-full">
					<h2 class="pb-8">Sign in to link accounts</h2>
					<div class="flex flex-col w-full max-w-lg">
						<div class="flex flex-row items-center md:flex-start justify-between w-full">
							<BaseButton
								btn-type="logo"
								class="w-full px-2 pt-2"
								btn-size="large"
								btn-style="px-4"
								@click="createOAuthSession('google')"
							>
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
						<div v-if="hasErrorsOauth" class="text-rose-600 my-2 max-w-2xl">
							There was a problem logging in, please try another method
						</div>
						<div class="w-full mt-5">
							<div class="relative flex py-3 items-center">
								<div class="flex-grow border-t border-border"></div>
								<span class="flex-shrink mx-4 text-forrest-700 font-semibold">Or</span>
								<div class="flex-grow border-t border-border"></div>
							</div>
						</div>
						<div class="flex flex-col items-center md:flex-start justify-between w-full">
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
							<BaseButton btn-type="primary" class="w-full flex pt-6" btn-style="w-full" btn-size="large" @click="login">
								Sign In
							</BaseButton>
						</div>
						<div class="text-green-700 mt-8 text-xl font-semibold max-w-2xl underline">
							<nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
						</div>
						<div class="w-full mt-5">
							<div class="relative flex py-3 items-center">
								<div class="flex-grow border-t border-border"></div>
								<span class="flex-shrink mx-4 text-forrest-700 font-semibold">Not a registered user?</span>
								<div class="flex-grow border-t border-border"></div>
							</div>
						</div>
						<BaseButton to="/onboarding/start" btn-type="line" class="w-full flex pt-6" btn-style="w-full" btn-size="large">
							Register
						</BaseButton>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
// TEST STRING = signin?accountid=123456&startdate=07/22/2022&enddate=07/22/202&DataCustodianID=ConEdison

// FROM COMED: https://staging.energybycottage.com/oauth/comed/signin?DataCustodianID=ComEd&scope=FB=1_3_4_5_13_14_18_35_37_40;3bIntervalDuration=1800;BlockDuration=Monthly;HistoryLength=63072000;BR=1

import { differenceInMonths } from "date-fns";
import { validateEmail } from "~~/utils/validation";

const route = useRoute();
const utilityCompany = route.params.utilityCompany;
const { accountid, startdate, enddate, DataCustodianID } = route.query;

const signInEmail = ref("");
const signInPassword = ref("");
const hasErrorsEmail = ref(false);
const hasErrorsPassword = ref(false);
const hasErrorsOauth = ref(false);

definePageMeta({
	layout: "oauth",
	middleware: async () => {
		const user = useSupabaseUser();
		const route = useRoute();
		const utilityCompany = route.params.utilityCompany;
		console.log(utilityCompany);
		const { accountid, startdate, enddate, DataCustodianID } = route.query;
		if (utilityCompany === "coned") {
			if (enddate) {
				const today = new Date();
				const sharingEndDate = new Date(enddate as string);
				const diffInMonths = differenceInMonths(sharingEndDate, today);
				if (diffInMonths > 10) {
					if (user.value) {
						return navigateTo({
							path: "/oauth/" + utilityCompany + "/scopes",
							query: {
								accountid,
								startdate,
								enddate,
								DataCustodianID,
							},
						});
					}
				} else {
					return navigateTo("/oauth/" + utilityCompany + "/end-date-error");
				}
			} else {
				return navigateTo("/oauth/" + utilityCompany + "/end-date-error");
			}
		} else {
			if (user.value) {
				return navigateTo({
					path: "/oauth/" + utilityCompany + "/scopes",
					query: {
						accountid,
						DataCustodianID,
					},
				});
			}
		}
	},
});

async function login() {
	hasErrorsEmail.value = false;
	hasErrorsPassword.value = false;
	hasErrorsOauth.value = false;

	if (validateEmail(signInEmail.value)) {
		try {
			await useAuth().login(signInEmail.value, signInPassword.value);
			return navigateTo({
				path: "/oauth/" + utilityCompany + "/scopes",
				query: {
					accountid: accountid ?? "",
					startdate: startdate ?? "",
					enddate: enddate ?? "",
					DataCustodianID: DataCustodianID ?? "",
				},
			});
		} catch (err) {
			hasErrorsPassword.value = true;
			console.log(err);
		}
	} else {
		hasErrorsEmail.value = true;
	}
}

async function createOAuthSession(provider: string) {
	hasErrorsOauth.value = false;
	try {
		await useAuth().createOAuthSession(
			provider,
			"/oauth/" +
				utilityCompany +
				"/scopes" +
				(accountid ?? "?accountid=" + accountid) +
				(startdate ?? "&startdate=" + startdate) +
				(enddate ?? "&enddate=" + enddate) +
				(DataCustodianID ?? "&DataCustodianID=" + DataCustodianID),
		);
	} catch (err) {
		console.log(err);
		hasErrorsOauth.value = true;
	}
}
</script>

<style lang="sass" scoped></style>
