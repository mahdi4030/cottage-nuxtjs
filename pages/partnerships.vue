<template>
	<div class="w-screen flex flex-col">
		<section class="w-full overflow-hidden relative">
			<div class="flex flex-col mt-40 container m-auto text-left z-10 xl:max-w-6xl px-6 md:px-0 pb-20">
				<div class="flex flex-col md:w-1/2 z-10">
					<h4 class="">We love like-minded people</h4>
					<h1 class="pt-4 pb-8">Partnerships</h1>
					<div class="text-lg md:text-xl leading-tight max-w-3xl pb-8">
						Cottage makes it easy for humans to make an impact. We're committed helping our customers seamlessly access energy, find
						alternative options, and select the best rates. Whether you're an Energy Supply company, or just interested in our mission, we
						want to be your partner on the path to carbon neutrality.
					</div>
					<BaseButton class="w-auto" :btn-style="'w-1/2'" :to="'mailto:partnerships@energybycottage.com'" btn-size="large">
						Let's Chat
					</BaseButton>
				</div>
			</div>
			<PartnershipsBanner class="hidden md:block absolute top-32 -right-20 lg:-top-20 lg:-right-32 z-0 w-3/5" />
		</section>
		<section class="bg-tan-500 w-full py-16 lg:py-20">
			<div class="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
				<h4 class="pb-4 text-center">Working together to drive sustainable change</h4>
				<h2 class="text-center">Our Partners</h2>
				<div class="flex flex-col py-8">
					<div class="flex flex-col py-4 max-w-3xl">
						<!-- <div class="flex flex-row py-4 w-full lg:w-1/2 px-6">
              <nuxt-icon name="apartments" class="min-w-fit pr-6" style="font-size: 3rem" filled />
              <div>
                <h3>Landlords</h3>
                <div class="text-lg md:text-xl leading-tight py-1">
                  Utilizing Cottage, residents use their collective bargaining power to lower energy rates while accessing cleaner energy supply. We provide real-time, in-unit, data for Landlords that
                  can be used for analysis on capital investments and emission reporting. We also help transition energy accounts during tenant turnover and ensure seamless transition and billing
                  during vacancy periods.
                </div>
              </div>
            </div> -->
						<div class="flex flex-row py-4 w-full px-6">
							<nuxt-icon name="electricity" class="min-w-fit pr-6" style="font-size: 3rem" filled />
							<div>
								<h3>Electricity Supply Companies</h3>
								<div class="text-lg md:text-xl leading-tight py-1">
									Cottage helps sign-up customers for alternative energy supply with a focus on renewable and mixed renewable
									options. We enroll our customers in fixed rates to help provide predictability and planning that can be used to
									better plan for demand uncertainty.
								</div>
							</div>
						</div>
						<div class="flex flex-row py-4 w-full px-6">
							<nuxt-icon name="solar-panel" class="min-w-fit pr-6" style="font-size: 3rem" filled />
							<div>
								<h3>Community Solar Farms</h3>
								<div class="text-lg md:text-xl leading-tight py-1">
									Cottage helps you get your community solar projects subscribed without the burden and overhead of direct marketing
									efforts. We help educate our customers on the benefits of community solar while establishing trust and
									transparency.
								</div>
							</div>
						</div>
						<div class="flex flex-row py-4 w-full px-6">
							<nuxt-icon name="leaf" class="min-w-fit pr-6" style="font-size: 3rem" filled />
							<div>
								<h3>Climate Tech Companies</h3>
								<div class="text-lg md:text-xl leading-tight py-1">
									We love to work with other climate tech companies to provide customer-centric innovations. We want to provide as
									many tools and resources for our customers as we can and are always open to new ideas that can create progress
									towards a carbon neutral world.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="bg-tan-200 w-full py-16 lg:pt-20">
			<div class="flex flex-col container m-auto items-center px-6 lg:px-0 xl:max-w-6xl">
				<h2 class="text-center pt-4 pb-8">Have an idea for how you want to work with Cottage? We’d love to chat!</h2>
				<BaseButton class="w-auto" :btn-style="'my-4'" btn-type="secondary" :to="'mailto:partnerships@energybycottage.com'" btn-size="large">
					Contact Us
				</BaseButton>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import PartnershipsBanner from "~/assets/img/external/partnerships-banner.svg?component";

definePageMeta({
	layout: "external",
});
</script>

<style lang="sass" scoped></style>
