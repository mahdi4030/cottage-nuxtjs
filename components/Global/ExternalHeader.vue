<template>
	<header :class="{ scrolled: !atTopOfPage }" class="absolute left-0 top-2 z-50 w-screen bg-transparent">
		<div class="xl:container mx-auto flex items-center flex-wrap flex-row justify-between md:items-center md:space-x-4 py-2 lg:pt-2 px-6 lg:px-6">
			<span class="logo-wrapper z-30">
				<nuxt-link to="/">
					<CottageLogoSVG class="h-auto w-40" :class="[isLightNav ? 'white-logo' : '']" />
				</nuxt-link>
			</span>
			<button
				class="inline-block md:hidden w-11 h-11 bg-green-200/20 font-primary p-1 rounded outside-click-exclude z-50"
				:class="{ 'text-white': isLightNav }"
				@click="toggleMenu"
			>
				<svg
					style="transform: rotate(180deg)"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					class="outside-click-exclude"
				>
					<path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
			<nav
				class="absolute md:visible md:opacity-100 md:flex md:relative top-0 left-0 md:inset-auto z-50 flex flex-col md:flex-row md:space-x-4 font-semibold w-full md:w-auto bg-tan-200 shadow-md md:rounded-none md:shadow-none md:bg-transparent p-6 pt-4 md:p-0 h-screen md:h-auto transition-all duration-300 md:justify-center md:items-center"
				:class="{
					'visible opacity-100 overflow-hidden': mobileMenuOpen,
					'hidden opacity-0': !mobileMenuOpen,
				}"
			>
				<div
					class="flex flex-row justify-between items-center"
					:class="{
						'visible opacity-100 overflow-hidden': mobileMenuOpen,
						'hidden opacity-0': !mobileMenuOpen,
					}"
				>
					<span class="logo-wrapper z-30 transition-all duration-500 py-2">
						<nuxt-link to="/">
							<CottageLogoSVG class="h-auto w-40" />
						</nuxt-link>
					</span>
					<span class="p-2" @click="toggleMenu">
						<nuxt-icon name="close" filled class="text-xl" />
					</span>
				</div>
				<nuxt-link
					to="/how-it-works"
					class="block mt-4 md:mt-0 py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto"
					:class="{
						'top-0': mobileMenuOpen,
						'-top-8': !mobileMenuOpen,
						'text-white': !mobileMenuOpen && isLightLinks,
						'text-forrest-700': mobileMenuOpen || !isLightLinks,
					}"
					@click="toggleMenu"
				>
					How it Works
				</nuxt-link>
				<nuxt-link
					to="/about-us"
					class="block py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto"
					:class="{
						'top-0': mobileMenuOpen,
						'-top-8': !mobileMenuOpen,
						'text-white': !mobileMenuOpen && isLightLinks,
						'text-forrest-700': mobileMenuOpen || !isLightLinks,
					}"
					@click="toggleMenu"
				>
					About
				</nuxt-link>
				<nuxt-link
					to="/faqs"
					class="block py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto"
					:class="{
						'top-0': mobileMenuOpen,
						'-top-8': !mobileMenuOpen,
						'text-white': !mobileMenuOpen && isLightLinks,
						'text-forrest-700': mobileMenuOpen || !isLightLinks,
					}"
					@click="toggleMenu"
				>
					FAQs
				</nuxt-link>
				<!-- <nuxt-link
					to="/partnerships"
					class="block md:hidden lg:block py-4 md:py-3 px-2 hover:underline text-3xl md:text-lg transition-all duration-500 relative md:inset-auto"
					:class="{
						'top-0': mobileMenuOpen,
						'-top-8': !mobileMenuOpen,
						'text-white': !mobileMenuOpen && isLightLinks,
						'text-forrest-700': mobileMenuOpen || !isLightLinks,
					}"
					@click="toggleMenu"
				>
					Partnerships
				</nuxt-link> -->
				<BaseButton
					v-if="showHeaderButtonsProp && showHeaderButtons"
					btn-size="base"
					:btn-style="[
						'!text-xl md:!text-base px-8  mt-2 md:mt-0 py-2',
						{
							'bg-transparent border-2 border-green-700 !text-green-700 hover:!text-white hover:bg-green-700':
								!isLightLinks && !mobileMenuOpen,
						},
						{
							'bg-transparent border-2': atTopOfPage && !mobileMenuOpen,
						},
						{
							'bg-transparent border-2 border-green-700 !text-green-700': !atTopOfPage && !mobileMenuOpen,
						},
					]"
					to="/signin"
				>
					Sign In
				</BaseButton>
				<BaseButton
					v-if="showHeaderButtonsProp && showHeaderButtons"
					btn-size="base"
					btn-type="primary"
					:btn-style="['!text-xl md:!text-base px-8 mt-6 md:mt-0 bg-green-700 py-2']"
					to="/onboarding/start"
				>
					Get Started
				</BaseButton>
			</nav>
		</div>
	</header>
</template>

<script setup lang="ts">
import { RouteRecordName } from "vue-router";
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
const route = useRoute();

const mobileMenuOpen = ref(false);
const atTopOfPage = ref(true);
const isLightLinks = ref(false);
const isLightNav = ref(false);
const showHeaderButtons = ref(true);

const lightLinkRoutes: RouteRecordName[] = ["index", "about-us"];

// write a function to define props nuxt3
const props = defineProps({
	showHeaderButtonsProp: {
		type: Boolean,
		default: true,
	},
	isLightNavProp: {
		type: Boolean,
		default: false,
	},
});

watch(route, (to) => {
	mobileMenuOpen.value = false;
	if (lightLinkRoutes.includes(to.name)) {
		isLightLinks.value = true;
	} else {
		isLightLinks.value = false;
	}
	if (to.name === "about-us" || to.name === "index") {
		isLightNav.value = true;
	} else {
		isLightNav.value = false;
	}
});

onMounted(() => {
	if (lightLinkRoutes.includes(route.name)) {
		isLightLinks.value = true;
	}
	if (route.name === "about-us" || route.name === "index") {
		isLightNav.value = true;
	}
	if (props.isLightNavProp) {
		isLightNav.value = true;
		isLightLinks.value = true;
	}
});

onBeforeMount(() => {
	window.addEventListener("scroll", handleScroll);
});

function toggleMenu() {
	if (window.innerWidth <= 767) {
		mobileMenuOpen.value = !mobileMenuOpen.value;
		if (mobileMenuOpen.value === false) {
			document.body.classList.remove("mobile-menu-open");
		} else if (mobileMenuOpen.value === true) {
			document.body.classList.add("mobile-menu-open");
		}
	}
}

function closeMenu() {
	mobileMenuOpen.value = false;
}

function handleScroll() {
	// when the user scrolls, check the pageYOffset
	// this.mobileMenuOpen = false
	const yOffset = window.innerWidth <= 700 ? 50 : 200;

	if (window.pageYOffset > yOffset) {
		// user is scrolled
		if (atTopOfPage.value) {
			atTopOfPage.value = false;
			isLightLinks.value = false;
			isLightNav.value = false;
		}
	} else {
		// user is at top of page
		if (!atTopOfPage.value) {
			atTopOfPage.value = true;
			if (lightLinkRoutes.includes(route.name) || props.isLightNavProp) {
				isLightLinks.value = true;
			} else {
				isLightLinks.value = false;
			}
			if (route.name === "about-us" || route.name === "index" || props.isLightNavProp) {
				isLightNav.value = true;
			} else {
				isLightNav.value = false;
			}
		}
	}
}
</script>

<style lang="sass" scoped>
header
  transition: box-shadow 0.5s ease-in-out

header.scrolled
  box-shadow: 0 8px 8px -1px rgba(0, 0, 0, 0.1), 0 3px 6px -1px rgba(0, 0, 0, 0.06)
  border-bottom: 0px
  z-index:200
  background-color: #FAFBF6
  position: fixed
  top:0
</style>
