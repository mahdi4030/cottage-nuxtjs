<template>
	<div>
		<NuxtLayout name="external">
			<div class="w-screen flex flex-col px-4">
				<section class="w-full">
					<div class="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
						<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl w-full max-w-5xl items-center">
							<h2 class="pb-8">
								Hmmm...
								<br />
								We don't have an account for that email
							</h2>
							<div class="text-forrest-700 text-lg md:text-xl max-w-2xl">That email is not associated with a Cottage account.</div>
							<div class="text-forrest-700 text-lg md:text-xl max-w-2xl pt-4">
								If you think something is wrong, reach out to us at
								<a class="text-green-700 underline" href="mailto:support@energybycottage.com">support@energybycottage.com</a>
							</div>
							<div class="flex items-center justify-center w-full pt-8">
								<BaseButton to="/onboarding/start" btn-size="large" btn-style="" btn-type="primary" class="w-full md:w-60">
									Sign Up
								</BaseButton>
							</div>
						</ElementsCard>
					</div>
				</section>
			</div>
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
});
</script>
