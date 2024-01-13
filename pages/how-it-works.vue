<template>
	<div class="w-screen flex flex-col">
		<section class="w-full">
			<div class="flex flex-col mt-36 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0 pb-12">
				<div class="flex flex-col text-center justify-center items-center">
					<h4 class="">A different approach to Energy</h4>
					<h1 class="pt-4 pb-8">How it Works</h1>
					<div class="text-lg md:text-xl leading-tight max-w-3xl pb-6">
						Stand up to skyrocketing energy prices by letting us manage your electricity account. We <b>power-up</b> your electricity
						account to help you go green and save money.
					</div>
					<div class="flex flex-col lg:flex-row py-4">
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
							<nuxt-icon name="lower-bill" class="mb-3 lg:mb-8 mx-auto" style="font-size: 4rem" filled />
							<h3 class="text-center">Save money</h3>
							<div class="text-lg md:text-xl leading-tight text-center py-2">
								We monitor the market for local tax and savings incentives. When we find them, we let you know.
							</div>
						</div>
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
							<nuxt-icon name="green-earth" class="mb-3 lg:mb-8 mx-auto" style="font-size: 4rem" filled />
							<h3 class="text-center">Go green</h3>
							<div class="text-lg md:text-xl leading-tight text-center py-2">
								Energy supply can be generated from clean sources like solar and wind which impacts emissions.
							</div>
							<nuxt-link
								to="/electric-plan-switching"
								class="text-green-700 font-semibold underline pt-2 text-lg md:text-xl leading-tight text-center py-2"
								>Learn about electricity switching</nuxt-link
							>
						</div>
						<div class="flex flex-col lg:w-1/3 py-4 lg:py-0 px-8">
							<nuxt-icon name="peace-of-mind" class="mb-3 lg:mb-8 mx-auto" style="font-size: 4rem" filled />
							<h3 class="text-center">Stress free</h3>
							<div class="text-lg md:text-xl leading-tight text-center py-2">
								We work with your utility so you don't do anything different. We guarantee no disruption or service interruption.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="bg-tan-500 w-full py-16 lg:py-20">
			<div class="flex flex-col container xl:max-w-6xl px-6 lg:px-0 m-auto items-center justify-center">
				<div class="flex flex-col">
					<h4 class="text-center">Always on so you don’t have to be</h4>
					<h2 class="py-4 text-center">How Cottage Works for You</h2>
					<div class="text-xl max-w-4xl text-center">
						Cottage is not a utility company.
						<br />
						Our goal is to simplify energy management.
					</div>
				</div>
				<div class="flex flex-col lg:flex-row justify-center items-center">
					<div class="w-full lg:w-1/2 p-8 flex justify-center items-center">
						<div class="flex flex-col p-8 shadow-xl rounded-2xl bg-white relative max-w-sm">
							<nuxt-icon name="add-user" class="self-start" style="font-size: 3rem" filled />
							<h3 class="pt-2">Create an account</h3>
							<div class="text-lg md:text-xl leading-tight pb-2">Sign up with Cottage and we "power-up" your electric account</div>
						</div>
					</div>
					<div class="flex flex-col pt-8 w-full lg:w-1/2">
						<div class="flex flex-col py-4">
							<div class="flex flex-row py-4">
								<nuxt-icon name="briefcase-manage" class="min-w-fit pr-6" style="font-size: 3rem" filled />
								<div>
									<h3>We manage the account</h3>
									<div class="text-lg md:text-xl leading-tight py-1">
										We help manage your account with the utility company and can even help you move-in / move-out.
									</div>
								</div>
							</div>
							<div class="flex flex-row py-4">
								<nuxt-icon name="switch" class="min-w-fit pr-6" style="font-size: 3rem" filled />
								<div>
									<h3>We seamlessly work in the background</h3>
									<div class="text-lg md:text-xl leading-tight py-1">
										We find ways to "power-up" your electricity with renewable energy and savings without the hassle.
									</div>
								</div>
							</div>
							<div class="flex flex-row py-4">
								<nuxt-icon name="binoculars" class="min-w-fit pr-6" style="font-size: 3rem" filled />
								<div>
									<h3>We lookout for savings incentives</h3>
									<div class="text-lg md:text-xl leading-tight py-1">
										We constantly scout for ways to lower the cost of your energy bill. As soon as we find them, we build them
										into Cottage and pass the savings on to you.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section id="make-money" class="bg-tan-200 w-full py-16 lg:py-20">
			<div class="flex flex-col container xl:max-w-5xl px-6 lg:px-0 m-auto items-center justify-center">
				<div class="flex flex-col md:flex-row w-full">
					<div class="flex flex-col lg:p-6 w-full lg:w-2/5">
						<h4>Everyone Wins</h4>
						<h2 class="py-4">How We Make Money</h2>
						<div class="text-xl py-1">
							Cottage is
							<b>free to sign-up</b>
							and
							<b>always will be</b>
							for customers.
						</div>
					</div>
					<div class="w-full lg:w-3/5 p-6">
						<div class="flex flex-col py-4">
							<div class="flex flex-row py-4">
								<div
									style="min-width: 40px"
									class="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
								>
									1
								</div>
								<div class="text-lg md:text-xl leading-tight">
									We monitor the market for "power-ups", dig into the details of the fine print in the terms and conditions, and
									choose partners that share our mission.
								</div>
							</div>
							<div class="flex flex-row py-4">
								<div
									style="min-width: 40px"
									class="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
								>
									2
								</div>
								<div class="text-lg md:text-xl leading-tight">
									We make it easier for our partners to find customers, so they spend less on advertising, and can pass through the
									cost of green energy to you for no extra cost.
								</div>
							</div>
							<div class="flex flex-row py-4">
								<div
									style="min-width: 40px"
									class="text-3xl text-white bg-green-700 w-10 h-10 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
								>
									3
								</div>
								<div class="text-lg md:text-xl leading-tight">
									To cover our costs, our partners pay us a small referral for bringing them new customers. They pay us so you don’t
									have to.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="bg-tan-500 w-full py-16 lg:py-20">
			<div class="flex flex-col lg:flex-row container xl:max-w-6xl m-auto items-end justify-center p-6 lg:p-12">
				<div class="flex flex-col lg:w-2/3">
					<h2 class="py-4">Partner with Us</h2>
					<div class="text-lg: md:text-xl">
						Have an idea for a power-up that can help people better manage their electricity or simply want to join with our mission?
						Become a Cottage partner! Reach out to learn how we can work together to green the planet. Let's start the conversation about
						sustainability and get on the path to carbon neutrality.
					</div>
				</div>
				<div class="w-full px-8 lg:w-1/4 pt-4 lg:pt-0">
					<BaseButton class="w-auto" :btn-style="'my-4'" :to="'/partnerships'" btn-size="large">Learn More</BaseButton>
					<BaseButton
						class="w-auto"
						:btn-style="'my-4'"
						btn-type="secondary"
						:to="'mailto:partnerships@energybycottage.com'"
						btn-size="large"
					>
						Contact Us
					</BaseButton>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import UtilityBill from "~/assets/img/external/utility-bill.svg?component";
import SupplyScene from "~/assets/img/external/supply-scene.svg?component";
import DeliveryScene from "~/assets/img/external/delivery-scene.svg?component";
import HowItWorksArrow from "~/assets/img/external/how-it-works-arrow.svg?component";

definePageMeta({
	layout: "external",
});
</script>

<style lang="sass" scoped>
.bill-svg-drop-shadow
  filter: drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.02)) drop-shadow(0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852)) drop-shadow(0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481)) drop-shadow(0px 20px 13px rgba(0, 0, 0, 0.01)) drop-shadow(0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185)) drop-shadow(0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481))

.move-up-and-down
  animation: MoveUpDown 2.5s linear infinite
  position: absolute

@keyframes MoveUpDown
  0%, 100%
    top: 60px
  50%
    top: 70px
</style>
