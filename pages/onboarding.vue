<template>
	<div>
		<NuxtLayout name="onboarding">
			<div v-if="showNavigation" class="h-[.375rem] bg-green-200 z-50 w-full relative">
				<span
					class="bg-green-700 left-0 top-0 bottom-0 absolute transition-all duration-500"
					:style="'width:' + progressPercent + '%'"
				></span>
			</div>
			<header v-if="!isPartnerStart" class="left-0 top-[.375rem] w-screen z-40 absolute">
				<div class="h-14 lg:px-14 flex justify-center items-center mx-auto relative">
					<span class="absolute left-4 md:left-8 lg:left-14">
						<nuxt-link @click="isModalOpen = true">
							<CottageLogoSVG class="h-auto w-32 md:w-32 cursor-pointer" />
						</nuxt-link>
					</span>
					<div v-show="showNavigation" class="cursor-pointer absolute right-6 lg:right-14" @click="isModalOpen = true">
						<nuxt-icon name="restart" class="text-2xl md:text-3xl" filled />
					</div>
				</div>
			</header>
			<div class="pt-16 md:pt-12 flex flex-col items-center pb-20 w-screen">
				<ClientOnly>
					<ModalAction :is-modal-open="isModalOpen" @cancelAction="closeModal" @confirmAction="discardApplication">
						<template #header>Discard your application?</template>
						<template #body>
							<p class="text-lg text-center">
								This will
								<b>clear your answers</b>
								and take you back to our home page.
							</p>
						</template>
					</ModalAction>
				</ClientOnly>
				<div class="flex w-full items-start justify-center pt-2 md:pt-4 relative px-3 md:px-4">
					<NuxtPage id="onboarding-page" />
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import routes from "~/assets/json/form-routes.json";
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
import "@stripe/stripe-js";

const route = useRoute();
const isModalOpen = ref(false);

const progressPercent = computed(() => {
	const currentRoute = route.path;
	const routingLogic = routes.DEFAULT;
	const totalPages = routingLogic.length;
	const currentIndex = routingLogic.findIndex((arr) => {
		return arr.path === currentRoute;
	});
	const progress = ((currentIndex + 1) / totalPages) * 100;
	return progress;
});

const showNavigation = computed(() => {
	const currentRoute = route.path;
	if (currentRoute === "/onboarding/success" || currentRoute === "/onboarding/partner-start") {
		return false;
	}
	return true;
});

const isPartnerStart = computed(() => {
	const currentRoute = route.path;
	if (currentRoute === "/onboarding/partner-start") {
		return true;
	}
	return false;
});

async function discardApplication() {
	useResetOnboarding();
	try {
		await useAuth().logout();
	} catch (error) {
		console.log("No logged in account");
	}
	navigateTo("/");
}

function closeModal() {
	isModalOpen.value = false;
}

definePageMeta({
	// layout: "onboarding",
	layout: false,
	middleware: "onboarding",
});

// useHead({
//   script: [{ src: "https://js.stripe.com/v3/" }],
// });
</script>
