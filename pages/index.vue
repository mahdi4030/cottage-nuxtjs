<template>
	<div class="w-screen flex flex-col">
		<section class="bg-forrest-700 text-tan-200 pb-12">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 mt-12">
				<h1 class="mx-auto max-w-5xl font-display font-medium tracking-tight text-tan-200 text-[2.5rem] leading-none md:text-6xl">
					<span class="z-10"> Power your home with </span>
					<span class="relative whitespace-nowrap text-tan-200">
						<svg
							aria-hidden="true"
							viewBox="0 0 418 42"
							class="absolute top-2/3 left-0 h-[0.58em] w-full fill-green-700/70"
							preserveAspectRatio="none"
						>
							<path
								d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
							></path>
						</svg>
						<span class="relative"> green energy </span>
					</span>
					<span class="z-10"> without increasing your bill </span>
					<!-- <span class="block md:inline-block relative whitespace-nowrap text-green-700 z-10"
						><span id="type-effect" ref="typeItSpan" class="relative"></span
					></span> -->
				</h1>
				<div class="text-base md:text-lg max-w-5xl text-center pt-12 mx-auto leading-tight">
					We think renewable energy should be the standard. And free.<br />
					One year on renewable energy is like...
				</div>
				<ClientOnly>
					<div class="text-xl md:text-2xl max-w-5xl text-center mx-auto leading-tight h-8 pt-2">
						<span id="type-effect" class="font-bold text-white"> </span>
					</div>
				</ClientOnly>
				<!-- <div class="text-xl max-w-4xl text-center pt-8 pb-4 mx-auto">See what Cottage can do for you</div> -->
				<div class="flex flex-col md:flex-row max-w-2xl pt-6 w-full text-left space-x-0 md:space-x-4 space-y-4 md:space-y-0 mx-auto">
					<div class="w-full">
						<BaseAddressGoogle
							v-model="registration.displayAddress"
							input-name="displayAddress"
							placeholder="Address"
							:return-full-address="true"
							:has-errors="hasAddressError"
							@setAddressComponents="setAddressComponents"
						>
							Address
						</BaseAddressGoogle>
					</div>
					<div class="min-w-fit"><BaseButton @click="handleGetStarted">Check Availability</BaseButton></div>
				</div>
				<div class="flex flex-col font-bold pt-8 relative items-center">
					Learn how to get started
					<nuxt-icon name="down-arrow" class="w-auto move-up-and-down" style="font-size: 2rem" filled />
				</div>
			</div>
		</section>
		<section class="bg-tan-200 w-full py-16 lg:pt-24">
			<div class="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
				<h4 class="pb-4">EASY AND FAST</h4>
				<h2 class="md:pb-8">Sign-up in 3 easy steps</h2>
				<div class="flex flex-col lg:flex-row py-4 space-x-0 md:space-x-16">
					<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
						<nuxt-icon name="location" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
						<h3 class="">Sign-up with your address</h3>
						<div class="text-lg leading-tight py-1">Enter your address for your home or apartment building.</div>
					</div>
					<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
						<nuxt-icon name="linked" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
						<h3 class="">Link your utility account</h3>
						<div class="text-lg leading-tight py-1">
							Link your electric account so that we can match your monthly usage with clean energy
						</div>
					</div>
					<div class="flex flex-col lg:w-1/3 py-4 lg:py-0">
						<nuxt-icon name="green-earth" class="mb-3 lg:mb-6" style="font-size: 4rem" filled />
						<h3 class="">Hassle free green energy</h3>
						<div class="text-lg leading-tight py-1">
							We secure green energy on your behalf without increasing your bill or needing you to install anything
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="bg-tan-200 w-full pt-8 pb-16 lg:pb-28">
			<div class="flex flex-col container m-auto px-6 lg:px-0 xl:max-w-6xl">
				<h2 class="text-center">What’s the catch? Free can’t mean free... right?</h2>
				<p class="pt-6 max-w-4xl text-left mx-auto text-center">
					Actually, yes. It can be that simple. Our goal is to make it simple for individuals to reduce their carbon footprints and
					contribute to a cleaner world, no matter if you rent or own your home. Everyone has an electricity bill, but not all electricity
					is the same. By simply coming together as a community, we have the power to negotiate how we want our electricity to be generated.
				</p>
				<nuxt-link
					class="text-center pt-6 text-green-700 underline text-lg font-semibold"
					:to="{ path: '/how-it-works', hash: '#make-money' }"
					:external="true"
					>Okay, but how do you make money?</nuxt-link
				>
			</div>
		</section>
		<section class="w-full py-16 lg:py-20 bg-tan-500">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-2xl md:text-center">
					<h2 class="text-center">Join the green energy revolution</h2>
					<p class="py-6 max-w-4xl text-center mx-auto">Something better for you and your neighbors</p>
				</div>
				<div class="w-full mx-auto">
					<ClientOnly>
						<TestimonialsCarousel />
					</ClientOnly>
				</div>
			</div>
		</section>
		<section class="w-full py-16 lg:py-20 bg-white">
			<div class="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-center justify-center">
				<div>
					<img class="w-60 h-60" src="~/assets/img/external/home-circle-trees.png" alt="" />
				</div>
				<div class="flex flex-col p-6 lg:p-12 lg:w-2/3">
					<h4>OUR MISSION</h4>
					<h2 class="py-4">Driven by purpose</h2>
					<div class="text-lg md:text-xl leading-tight">
						We believe that climate change is a threat. We're on a mission to remove barriers and make choosing electricity options
						equitable and accessible for everyone.
					</div>
				</div>
			</div>
		</section>
		<section class="w-full py-16 lg:py-20">
			<div class="flex flex-row container xl:max-w-6xl mx-auto justify-center items-center">
				<div class="flex flex-col text-center px-6">
					<h4>Above and Beyond for You</h4>
					<h2 class="py-4">Our Pledge</h2>
					<nuxt-icon name="privacy" class="m-auto" style="font-size: 5rem" filled />
					<div class="text-lg md:text-xl leading-tight py-8">
						Your privacy matters to us. So does your sanity.
						<br />
						We pledge not to sell your personal information, and that means no annoying calls, texts or emails.
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import TypeIt from "typeit";
import { RegistrationFlowType, ServiceGroupStatus } from "~/types/Enums";

const { registration } = useStore("registration");
const { getServiceGroup } = useStore("regServices");
const selectedAddress = ref(null);
const typeItSpan = ref(null);

const hasAddressError = ref(false);

async function setAddressComponents(val) {
	selectedAddress.value = registration.value.displayAddress;
	registration.value.isValidAddress = true;
	registration.value.isAddressCovered = null;
	registration.value.address.street = val.streetNum + " " + val.streetName;
	registration.value.address.city = val.city;
	registration.value.address.state = val.state;
	registration.value.address.zip = val.zip;
	registration.value.address.googlePlaceID = val.place_id;
	// check to see if the building is known. If it is, pass them to the found building page to select a unit
}

async function handleGetStarted() {
	hasAddressError.value = false;
	if (!registration.value.isValidAddress) {
		hasAddressError.value = true;
		return;
	}
	const serviceGroupStatus = await getServiceGroup(registration.value.address.zip);
	registration.value.isAddressCovered = serviceGroupStatus === ServiceGroupStatus.ACTIVE;
	if (serviceGroupStatus === ServiceGroupStatus.ACTIVE) {
		registration.value.flowType = RegistrationFlowType.DEFAULT;
		return navigateTo("/onboarding/address");
	} else if (serviceGroupStatus === ServiceGroupStatus.BETA) {
		return navigateTo("/onboarding/join-beta");
	} else {
		return navigateTo("/onboarding/join-waitlist");
	}
}

onMounted(() => {
	registration.value.displayAddress = "";
	// typeItSpan.value.textContent = "";
	// setTimeout(() => {
	// 	new TypeIt("#type-effect", {
	// 		speed: 50,
	// 		deleteSpeed: 35,
	// 		loop: true,
	// 	})
	// 		.type("green energy")
	// 		.pause(1500)
	// 		.delete(null)
	// 		.type("bill savings")
	// 		.pause(1500)
	// 		.delete(null)
	// 		.type("rate scanning")
	// 		.pause(1500)
	// 		.delete(null)
	// 		.type("home automation")
	// 		.pause(1500)
	// 		.delete(null)
	// 		.go();
	// }, 250);
	setTimeout(() => {
		new TypeIt("#type-effect", {
			speed: 50,
			deleteSpeed: 35,
			loop: true,
		})
			.type("7 Years of recycling ♻️")
			.pause(3500)
			.delete(null)
			.type("driving 10,000 fewer miles 🚙")
			.pause(3500)
			.delete(null)
			.type("growing 60 trees for 10 years 🌳")
			.pause(3500)
			.delete(null)
			.type("not burning 4,400 lbs of coal 🔥")
			.pause(3500)
			.delete(null)
			.go();
	}, 500);
});

definePageMeta({
	layout: "external",
});
</script>

<style lang="sass" scoped>

.home-banner
  background: url('~/assets/img/external/home-banner.svg')
  background-repeat: no-repeat
  background-size: cover

@media (max-width: 1000px)
  .home-banner
    background-position: top

@media (max-width: 767px)
  .home-banner
    background: none

.svg-drop-shadow
  filter: drop-shadow(4px 4px 4px rgba(0,0,0,.1)) drop-shadow(2px 2px 2px rgba(0,0,0,.18))

.move-up-and-down
  animation: MoveUpDown 2.5s linear infinite
  position: absolute

@keyframes MoveUpDown
  0%, 100%
    top: 60px
  50%
    top: 70px
</style>
