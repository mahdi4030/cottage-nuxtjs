<template>
	<div class="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
		<h2 class="text-center leading-tight">
			Hi, there 👋
			<br />
			Welcome to Cottage!
		</h2>
		<ClientOnly>
			<div class="p-6 flex flex-col text-center items-center">
				<p class="text-center pb-4 max-w-4xl">
					Cottage is a

					<a
						v-tooltip="{
							content:
								'Cottage is free and always will be. We make money through referral fees from our partners but NOT by selling your data. If you choose to use one of our partners, they pay us a small fee for connecting you with them.',
							triggers: ['hover', 'click'],
						}"
						class="font-bold text-green-700 underline"
					>
						free</a
					>

					<b> green energy management</b> platform. <br />We <b>power-up</b> electricity accounts to reduce carbon emissions and save on
					energy bills.
				</p>
				<h3 class="pt-4">What's next?</h3>
				<ul class="relative text-left pt-2 ml-0 md:ml-20 max-w-lg">
					<li class="pb-10 pl-6 border-l-2 border-green-700 flex flex-row space-x-4">
						<span
							class="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
						>
							1
						</span>
						<p class="pt-2 text-textblack">Enter your address</p>
					</li>
					<li class="pb-6 pl-6 border-l-2 border-green-700 flex flex-row space-x-4">
						<span
							class="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
						>
							2
						</span>
						<p class="mb-1 text-textblack">
							<b>Connect your electric account</b> (if you don't have one, we handle signing you up for electricity)
						</p>
					</li>
					<li class="pl-6 flex flex-row space-x-4">
						<span
							class="flex absolute -left-4 justify-center items-center w-8 h-8 bg-green-700 rounded-full ring-8 ring-tan-200 font-semibold text-xl pt-1 text-white"
						>
							3
						</span>
						<p class="mb-1 text-textblack">
							Cottage works in the background for you and <b>promises no disruption to service or unexpected charges</b>
						</p>
					</li>
				</ul>
				<p class="text-center mt-8">
					Want to know more before starting? <br />
					<a class="text-green-700 underline cursor-pointer font-semibold" @click="openChat">Open up a chat</a>
				</p>
			</div>
			<div class="container lg:px-6 pb-4">
				<FormNavigation
					:is-next-disabled="isNextDisabled"
					:show-previous="false"
					next-button-text="Let's Go"
					nav-btn-style="px-12 lg:px-16 py-3 lg:py-4 text-lg lg:text-xl"
					@nextPage="nextPage"
					@previousPage="previousPage"
				/>
			</div>
		</ClientOnly>
		<svg style="visibility: hidden; position: absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
					<feComposite in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
			</defs>
		</svg>
	</div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { useStore } from "~/helper/pinia-auto-refs";
const { navigateToNextPage, navigateToPreviousPage } = useOnboardingNavigation();

const isModalOpen = ref(false);
const modalTitle = ref("");
const modalBody = ref("");

const isFAQModalOpen = ref(false);

const isNextDisabled = computed(() => {
	return false;
});

function nextPage() {
	navigateToNextPage();
}
function previousPage() {
	navigateToPreviousPage();
}

function closeFAQModal() {
	isFAQModalOpen.value = false;
}

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I'd like a little more help understanding Cottage...");
}

definePageMeta({
	middleware: async () => {
		const { routingPath } = useOnboardingNavigation();
		routingPath.value = "DEFAULT";
		// const user = useSupabaseUser();
		// if (user.value) {
		// 	return navigateTo("/app/overview");
		// }
		useResetOnboarding();
	},
});
</script>

<style lang="sass" scoped>
.svg-drop-shadow
  filter: drop-shadow(4px 4px 4px rgba(0,0,0,.1)) drop-shadow(2px 2px 2px rgba(0,0,0,.18))
</style>
