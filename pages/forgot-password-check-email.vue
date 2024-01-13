<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex flex-col text-center justify-center items-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl w-full">
					<h2 class="pb-4">Check Your Email</h2>
					<nuxt-icon name="incoming-message" filled class="text-6xl" />
					<div class="text-forrest-700 pt-8 text-xl">A link will be sent to your email with further instructions.</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import IncomingMessage from "~/assets/icons/incoming-message.svg?component";

definePageMeta({
	layout: "external",
});
</script>
