<template>
	<div>
		<header class="left-0 top-0 w-screen z-40">
			<div class="h-20 px-14 flex justify-center items-center mx-auto relative">
				<span class="lg:absolute lg:left-14">
					<nuxt-link to="/">
						<CottageLogoSVG class="h-auto w-40" />
					</nuxt-link>
				</span>
			</div>
		</header>
		<div class="w-full max-w-4xl m-auto flex flex-col items-center">
			<h2 class="text-center leading-tight">{{ pageText.pageTitle }}</h2>
			<ElementsOnboardingCard class="text-center items-center">
				<nuxt-icon name="confetti" class="pb-4" style="font-size: 5rem" filled />
				<p class="text-center py-2 md:px-20">{{ pageText.pageBody }}</p>
				<div class="flex flex-row space-x-1 py-4">
					<p>
						<a class="underline text-green-700 font-semibold cursor-pointer" @click="openChat">Open a chat</a>
					</p>
					<p>give us a call at</p>
					<p>
						<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
						.
					</p>
				</div>
			</ElementsOnboardingCard>
			<div
				class="mt-8 flex md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse justify-center"
			>
				<BaseButton class="w-full md:w-48 mx-4" to="/" btn-size="large">Back to Home</BaseButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
const route = useRoute();
const { type, email } = route.query;

function openChat() {
	Intercom("update", { email });
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I have a question");
}

const pageText = computed(() => {
	if (type && type === "beta") {
		return {
			pageTitle: "Success! We will be in touch soon",
			pageBody: "You should hear from us in less than 24 hours (even on weekends) but if you have any questions, feel free to reach out.",
		};
	} else {
		return {
			pageTitle: "You're on the list!",
			pageBody: "We will make sure you are the first to know when we come to town.",
		};
	}
});
</script>
