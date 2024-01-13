<template>
	<div class="flex flex-col w-full">
		<ModalInfo :is-modal-open="isFAQModalOpen" max-width="max-w-5xl" @closeModal="closeFAQModal">
			<template #header>Common FAQs</template>
			<template #body>
				<ModalFAQBody />
			</template>
		</ModalInfo>
		<div class="pt-6 flex items-center justify-center">
			<span class="logo-wrapper z-30">
				<nuxt-link to="/">
					<CottageLogoSVG class="h-auto w-40" />
				</nuxt-link>
			</span>
		</div>
		<div class="flex md:flex-row flex-col mt-12 container w-full m-auto items-center text-left z-10 xl:max-w-6xl justify-center">
			<div v-if="validReferral" class="flex flex-col items-center">
				<h1 class="text-center text-5xl">Hi, there 👋</h1>
				<div class="py-12 text-center">
					<div class="text-2xl">
						<b>{{ referrerName }}</b>
						is inviting you to the easiest way to save money on your electric bill
					</div>
					<div class="text-2xl pt-4">And you can do a little something to for the planet as well 🌎</div>
				</div>
				<BaseButton class="w-full md:w-48 pt-2 md:pt-0" :btn-style="'md:w-48 px-4 text-lg'" to="/onboarding/address" btn-size="large">
					Get Started
				</BaseButton>
			</div>
			<div v-else class="flex flex-col items-center">
				<h2 class="text-center">We couldn't find that referral code... but you can still sign up!</h2>
				<div class="py-12 text-center">
					<div class="text-2xl">Cottage is the easiest way to save money on your electric bill</div>
					<div class="text-2xl pt-4">And you can do a little something to for the planet as well 🌎</div>
				</div>
				<BaseButton class="w-full md:w-48 pt-2 md:pt-0" :btn-style="'md:w-48 px-4 text-lg'" to="/onboarding/address" btn-size="large">
					Get Started
				</BaseButton>
			</div>
		</div>
		<div class="flex flex-col font-bold py-10 relative items-center pb-20">
			Want to learn more?
			<nuxt-icon name="down-arrow" class="pt-2 w-auto move-up-and-down" style="font-size: 2rem" filled />
		</div>
		<section class="w-full pt-16 pb-20 bg-tan-500">
			<div class="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
				<h2 class="text-center">Why Cottage?</h2>
				<ClientOnly>
					<p class="text-center pb-4 lg:py-8">
						Cottage is a
						<a
							v-tooltip="{
								content:
									'Cottage is free and always will be. We make money through referral fees from our suppliers but NOT by selling your data. If you choose to use one of our partner suppliers, theys pay us a small fee for connecting you with them.',
								triggers: ['hover', 'click'],
							}"
							class="font-bold text-green-700 underline"
						>
							free
						</a>
						<b>smart energy management</b>
						platform. We are not a utility company.
					</p>
				</ClientOnly>
				<div class="flex flex-col">
					<ul class="text-left max-w-xl">
						<li class="py-3 flex flex-row">
							<nuxt-icon name="green-earth" class="text-4xl mr-4" filled />
							<p>
								<b>Go green.</b>
								Subscribe to renewable energy from clean sources like solar and wind for the cost of a cup of coffee a month
							</p>
						</li>
						<li class="py-3 flex flex-row">
							<nuxt-icon name="decrease-cost" class="text-4xl mr-4" filled />
							<p>
								<b>Save money.</b>
								We monitor the market for savings opportunities and automatically apply them for you
							</p>
						</li>
						<li class="py-3 flex flex-row">
							<nuxt-icon name="briefcase-manage" class="text-4xl mr-4" filled />
							<p>
								<b>Set it and forget it.</b>
								We help manage your electricity account. If you don’t have an account yet, we take care of that too
							</p>
						</li>
					</ul>
					<p class="text-center mt-4">
						What else can we answer?
						<a class="block md:inline text-green-700 underline cursor-pointer font-semibold" @click="isFAQModalOpen = true">
							View more FAQs
						</a>
						or
						<a class="text-green-700 underline cursor-pointer font-semibold" @click="openChat">open up a chat</a>
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
import { useStore } from "~/helper/pinia-auto-refs";

const validReferral = ref(false);
const referrerName = ref("");
const { registration } = useStore("registration");
const route = useRoute();
const referralCode = route.params.referralCode;
if (referralCode) {
	try {
		const data = await $fetch("/api/referrals/get-referrer/" + referralCode, {
			method: "get",
		});
		validReferral.value = true;
		referrerName.value = data.firstName;
		registration.value.referrerCode = referralCode;
	} catch (error) {
		console.log("ERROR IS ", error);
		registration.value.referrerCode = "";
	}
}

const isFAQModalOpen = ref(false);
function closeFAQModal() {
	isFAQModalOpen.value = false;
}

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I'd like a little more help understanding Cottage...");
}
</script>

<style lang="sass" scoped>

.move-up-and-down
  animation: MoveUpDown 2.5s linear infinite
  position: absolute

@keyframes MoveUpDown
  0%, 100%
    top: 60px
  50%
    top: 70px
</style>
