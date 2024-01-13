<template>
	<footer>
		<div class="flex flex-row w-full justify-center items-center">
			<div class="container flex flex-row justify-between py-12 px-4 items-center">
				<div class="footer-logo">
					<NuxtLink to="/"><WhiteLogo /></NuxtLink>
				</div>
				<div class="flex flex-row flex-wrap justify-end px-4 space-y-1 md:px-0 md:space-x-12 md:space-y-0">
					<!-- <NuxtLink to="#">About</NuxtLink> -->
					<a class="text-white text-base font-semibold" href="mailto:support@energybycottage.com">Contact</a>
					<nuxt-link class="text-white text-base font-semibold" to="/partnerships">Partnerships</nuxt-link>
					<nuxt-link class="text-white text-base font-semibold" to="/terms-of-service">Terms of Service</nuxt-link>
					<nuxt-link class="text-white text-base font-semibold" to="/privacy-policy">Privacy Policy</nuxt-link>
					<a
						class="text-white text-base font-semibold"
						target="_blank"
						href="https://blocksurvey.io/survey/1AM9tCqpoR1ARzaFRVQgwaDHc2d4L9623v/e54a1477-6072-493f-8621-4cbf8ef9f757/r/l"
					>
						Feedback
					</a>
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full bg-forrest-900 text-white items-center">
			<div class="container py-4 px-4">Copyright Cottage Energy, Inc. 2023</div>
		</div>
	</footer>
</template>

<script>
import WhiteLogo from "@/assets/img/logo/cottage-logo-combined-white.svg?component";

export default {
	components: {
		WhiteLogo,
	},
};
</script>

<style lang="sass" scoped>
footer
  width: 100vw
  display: flex
  background-color: $forrest
  flex-direction: column
  z-index: 0
.footer-top-half
  padding: 4rem 1.5rem
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
.footer-logo > svg
  height: 50px
  width: auto
@media (max-width: 700px)
  .footer-top-half
    flex-direction: column
    padding: 1rem
    padding-top: 4rem
  .footer-links > a
    font-size: .75rem
    flex: 1 0 33%
    max-width: 40%
</style>
