<template>
	<div class="flex flex-col min-h-screen bg-tan-200">
		<ClientOnly>
			<TransitionGroup name="toast" tag="div" class="fixed top-4 right-4 z-50 max-w-md w-full transition-all space-y-4">
				<BaseToast v-for="toast in toastQueue" :id="toast.id" :key="toast.id" :message="toast.message" :type="toast.type" />
			</TransitionGroup>
		</ClientOnly>
		<div class="flex flex-row sm:hidden items-center justify-between px-4 py-2 bg-tan-200 fixed w-full z-50" :class="[isAtTop ? '' : 'shadow']">
			<button class="inline-block md:hidden w-11 h-11 bg-green-50 font-primary p-1 rounded outside-click-exclude z-50" @click="toggleMenu">
				<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="outside-click-exclude">
					<path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
			<span class="logo-wrapper z-30">
				<GreenCottageLogo class="h-10 w-auto" />
			</span>
			<GlobalAccountDropdown />
		</div>
		<GlobalAppSidebar class="z-[60]" :is-hidden="isHidden" :active-route="currentRoute" @toggleSidebar="toggleSidebar" />
		<main
			class="flex flex-1 h-full flex-col items-center w-screen bg-tan-200 mt-16 sm:mt-0"
			:class="[isHidden ? 'sidebar-collapsed' : 'sidebar-open']"
		>
			<div
				class="transition-all duration-200"
				:class="[!isHidden ? 'z-30 bg-black opacity-20 h-screen w-screen fixed top-0 bottom-0 sm:hidden' : 'opacity-0']"
			></div>
			<div class="p-4 md:p-10 w-full">
				<div v-if="!resident.isRegistrationComplete && currentRoute === 'app-overview'" class="flex flex-row text-center pb-4 relative">
					<slot name="header"></slot>
					<h2 class="w-full" style="font-size: 2.6rem; line-height: 1.5">Almost there, {{ resident.firstName }}!</h2>
					<GlobalAccountDropdown class="hidden sm:block absolute right-0" />
				</div>
				<div v-else class="flex flex-row justify-between pb-4">
					<slot name="header"></slot>
					<h2 style="font-size: 2.6rem; line-height: 1.5">
						{{ routeTranslation[currentRoute] }}
					</h2>
					<GlobalAccountDropdown class="hidden sm:block" />
				</div>
				<slot />
			</div>
		</main>
	</div>
</template>
<script setup lang="ts">
import GreenCottageLogo from "@/assets/img/logo/cottage-logo-green.svg?component";
const { resident } = useStore("resident");
// translates route names to header text
const routeTranslation = computed(() => {
	return {
		"app-account": "Account",
		"app-insights": "Insights & Usage",
		"app-power-ups": "Power-Ups",
		"app-billing": "Billing",
		"app-services": "Services",
		"app-overview": "Welcome back, " + resident.value.firstName,
		"app-support": "Support",
	};
});

const currentRoute = ref("");
const isHidden = ref(true);
const isAtTop = ref(true);
const mobileScreenWidth = 768;
const { toastQueue } = useToast();

watch(useRoute(), (to, from) => {
	currentRoute.value = to.name.toString();
	if (window.innerWidth <= 640) {
		isHidden.value = true;
	}
});

onMounted(() => {
	currentRoute.value = useRoute().name.toString();
	if (isMobile()) {
		window.addEventListener("scroll", onScroll);
	}
});

function toggleSidebar() {
	isHidden.value = !isHidden.value;
}

function toggleMenu() {
	isHidden.value = !isHidden.value;
}

const isMobile = (): boolean => {
	return window.innerWidth <= mobileScreenWidth;
};

const checkIfScrollbarIsAtTop = () => {
	if (!isMobile()) return;
	isAtTop.value = window.pageYOffset <= 30;
	// console.log("Is scrollbar at the top?", isAtTop.value);
};

const onScroll = () => {
	checkIfScrollbarIsAtTop();
};

onUnmounted(() => {
	if (isMobile()) {
		window.removeEventListener("scroll", onScroll);
	}
});
</script>
<style lang="sass" scoped>
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan

main
  transition: all .5s ease

.sidebar-collapsed
  padding-left: 5.5rem

.sidebar-open
  padding-left: 17rem

.toast-enter-active, .toast-leave-active
  transition: all .5s cubic-bezier(0.2, 0.5, 0.1, 1)
.toast-leave-to,
.toast-enter-from
  opacity:0

@media (max-width: 640px)
  main
    padding-left: 0 !important
</style>
