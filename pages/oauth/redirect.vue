<template>
	<div>
		<NuxtLayout name="external">
			<div class="flex py-12 flex-grow items-center justify-center">
				<nuxt-icon name="logo-flattened-animated" style="font-size: 200px; stroke-width: 4" filled />
			</div>
		</NuxtLayout>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
import posthog from "posthog-js";
// import { nanoid } from "nanoid";
const router = useRouter();
const supabase = useSupabaseClient();
const { getResident } = useStore("resident");
const { occupancy, getOccupancy } = useStore("occupancy");
const { fetchElectricData } = useStore("electricBill");

const user = useSupabaseUser();

onMounted(async () => {
	// eslint-disable-next-line no-undef
	watchEffect(async () => {
		if (user.value) {
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
			try {
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
});

definePageMeta({
	layout: "external",
});
</script>
<style></style>
