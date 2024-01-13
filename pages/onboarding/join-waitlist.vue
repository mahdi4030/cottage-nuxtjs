<template>
	<div class="w-full max-w-2xl flex flex-col items-center">
		<h2 class="text-center leading-tight">
			Sad news...
			<br />
			We are not in your area yet.
		</h2>
		<ElementsOnboardingCard class="text-center items-center">
			<div class="text-lg md:text-xl text-center">
				But we are planning on getting there soon!
				<br />
				Join our waiting list so we can keep you posted.
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
						How did you find out about us?
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
				:processing-request="startJoinWaitlist"
				processing-request-text="Submitting..."
				@click="submitWaitList"
			>
				Join Waitlist
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
const startJoinWaitlist = ref(false);

async function submitWaitList() {
	hasEmailError.value = false;

	if (validateEmail(waitListEmail.value)) {
		startJoinWaitlist.value = true;
		try {
			const { data, error } = await supabase.from("WaitList").insert({
				name: name.value,
				email: waitListEmail.value,
				reference: reference.value,
				address: registration.value.displayAddress,
				zip: registration.value.unit.zip,
				isForBeta: false,
			});

			const alertBody = {
				message: `New WAIT LIST added for ${name.value} 
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
					email: waitListEmail.value,
				},
			});
		} catch (err) {
			console.log("CATCHING THE ERRR", err);
			startJoinWaitlist.value = false;
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
