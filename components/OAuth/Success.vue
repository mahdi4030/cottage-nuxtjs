<template>
	<div class="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
		<div class="py-12">
			<nuxt-icon name="logo-flattened-animated" style="font-size: 160px; stroke-width: 4" filled />
		</div>
	</div>
</template>

<script setup lang="ts">
import { RegistrationAccountType } from "~~/types/Enums";
import posthog from "posthog-js";
const supabase = useSupabaseClient();
const supabaseAuthClient = useSupabaseAuthClient();
const { registration, createRegistration } = useStore("registration");
const { getCottageUserByID } = useStore("cottageUser");
const { serviceGroup } = useStore("regServices");

const isCreatingAccount = ref(false);

let timeout = null;
const user = useSupabaseUser();

async function handleLogin() {
	try {
		let cottageUser = null;
		try {
			cottageUser = await getCottageUserByID(user.value.id);
			console.log("COTTAGE USER VALUE IS", cottageUser);
		} catch (error) {
			console.log("COULD NOT FIND COTTAGE USER");
		}
		if (cottageUser) {
			console.log("ACCOUNT ALREADY EXISTS", cottageUser);
			return navigateTo("/account-already-exists");
		} else {
			await createRegistration(user.value);
		}
		timeout = setTimeout(() => {
			if (process.env.NODE_ENV === "production") {
				try {
					posthog.identify(
						user?.value.id, // distinct_id, required
						{
							email: user?.value.email,
						},
					);
				} catch (error) {
					console.log("COULD NOT CREATE PH SESSION", error);
				}
			}
			return navigateTo("/app/overview");
		}, 300);
	} catch (error) {
		// TODO: Handle error here if API fails
		console.log(error);
	}
}

// eslint-disable-next-line no-undef
watch(
	() => user.value,
	async () => {
		// console.log("USER VALUE WATCHING FROM CHILD");
		if (user.value) {
			console.log("IN WATCH, USER VALUE IS", user.value);
			if (!isCreatingAccount.value) {
				console.log("RUNNING HANDLE LOGIN");
				isCreatingAccount.value = true;
				await handleLogin();
			}
		}
		// } else {
		// 	await new Promise((resolve) => setTimeout(resolve, 3000));
		// 	const {
		// 		data: { session },
		// 	} = await supabaseAuthClient.auth.getSession();
		// 	console.log("COULD NOT FIND USER SO SETTING AUTH FROM SESSION");
		// 	const { user } = supabaseAuthClient.auth.setAuth(session.access_token);
		// 	console.log(user);
		// }
	},
);
</script>
