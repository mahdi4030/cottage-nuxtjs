<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
					<h2 class="pb-4">Oops! That didn't work...</h2>
					<nuxt-icon name="sad" class="py-4" style="font-size: 5rem" filled />
					<div class="flex flex-col w-full max-w-lg pt-4">
						<div class="text-forrest-700 text-xl text-center">
							Something went wrong... Mind trying again?
							<br />
							If this keeps happening,
							<a class="underline text-green-700 font-semibold cursor-pointer" @click="openChat">open up a chat</a>
							or give us a call
							<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
						</div>
						<BaseButton to="/oauth/coned/scopes" btn-type="primary" btn-style="w-full" class="flex mt-8 w-full" btn-size="large">
							Try Again
						</BaseButton>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
// So TYPESCRIPT does not throw a "Cannot Redeclare Block Scope Variable"
export {};
</script>
<script setup lang="ts">
const { resident } = useStore("resident");
const user = useSupabaseUser();

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("update", {
		email: user.value.email,
		name: resident.value.firstName + " " + resident.value.lastName,
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I am having issues connecting my utility account to Cottage.");
}

definePageMeta({
	layout: "oauth",
});
</script>
<style></style>
