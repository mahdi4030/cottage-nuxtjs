<template>
	<div class="w-full max-w-2xl flex flex-col items-center">
		<h2 class="text-center leading-tight">
			Good News 🙌
			<br />
			We are rolling out users in your area
		</h2>
		<ElementsOnboardingCard class="text-center items-center">
			<p class="pb-2">Submit your info and we will reach out with registration details.</p>
			<p class="text-center">Need electricity today?</p>
			<div class="flex flex-row space-x-1 pb-4">
				<p>
					<a class="underline text-green-700 font-semibold cursor-pointer" @click="openChat">Open a chat</a>
				</p>
				<p>give us a call at</p>
				<p>
					<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
					.
				</p>
			</div>
			<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full max-w-md">
				<div class="sm:col-span-6">
					<BaseInput v-model="name" class="w-full flex text-left mt-2" input-name="name" input-control="flex">Name</BaseInput>
				</div>
				<div class="sm:col-span-6">
					<BaseInput
						v-model="waitListEmail"
						:subtext="emailErrorMessage"
						:has-errors="hasEmailError"
						:show-subtext="hasEmailError"
						class="w-full flex text-left mt-1"
						autocomplete="email"
						input-name="email"
						input-control="flex"
					>
						Email
					</BaseInput>
				</div>
				<div class="sm:col-span-6">
					<BaseInput v-model="reference" class="w-full flex text-left mt-2" input-name="reference" input-control="flex">
						How did you find Cottage?
					</BaseInput>
				</div>
			</div>
		</ElementsOnboardingCard>
		<div
			class="mt-8 flex md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse justify-center"
		>
			<BaseButton class="w-full md:w-56" to="/onboarding/address" btn-size="large" btn-type="transparent">Back</BaseButton>
			<BaseButton
				class="w-full md:w-56"
				btn-size="large"
				:processing-request="startJoinBetaList"
				processing-request-text="Submitting..."
				@click="submitBetaList"
			>
				Submit
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
import { useStore } from "~~/helper/pinia-auto-refs";
import { validateEmail } from "~~/utils/validation";

const supabase = useSupabaseClient();
const { addToastToQueue } = useToast();
const auth = useAuth();
const waitListEmail = ref("");
const hasEmailError = ref(false);
const emailErrorMessage = ref("Enter a valid email");
const name = ref("");
const reference = ref("");
const { registration } = useStore("registration");
const startJoinBetaList = ref(false);

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I need to sign up for electricity today and want to use Cottage");
}

async function submitBetaList() {
	hasEmailError.value = false;

	if (validateEmail(waitListEmail.value)) {
		startJoinBetaList.value = true;
		try {
			const { data, error } = await supabase.from("WaitList").insert({
				name: name.value,
				email: waitListEmail.value,
				reference: reference.value,
				address: registration.value.displayAddress,
				zip: registration.value.unit.zip,
				isForBeta: true,
			});

			const alertBody = {
				message: `New BETA added for ${name.value} 
				at ${registration.value.displayAddress}
				at ${new Date().toLocaleString()}`,
				channel: "wait-list",
			};

			useLazyFetch("/api/send-alert", {
				method: "post",
				body: alertBody,
			});

			navigateTo({
				path: "/join-waitlist-success",
				query: {
					type: "beta",
					email: waitListEmail.value,
				},
			});
		} catch (err) {
			console.log("CATCHING THE ERRR", err);
			startJoinBetaList.value = false;
			addToastToQueue({
				message: "Something went wrong. Please try again later.",
				type: "warning",
			});
		}
	} else {
		hasEmailError.value = true;
	}
}
</script>
