<template>
	<div class="w-screen flex flex-col">
		<section class="w-full bg-tan-500">
			<div class="flex flex-col mt-36 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0 pb-12">
				<div class="flex flex-col text-center justify-center items-center">
					<h1 class="pb-8">Questions?</h1>
					<div class="text-lg md:text-xl leading-tight max-w-3xl pb-6">
						We know electricity and utilities can be complicated. We're here to help.
					</div>
					<div class="flex flex-col pt-4 md:px-16 text-center">
						<p class="text-lg md:text-xl">Give us a call at <span class="text-green-700">(646) 847-7885</span></p>
						<p class="py-2 text-lg md:text-xl">or</p>
						<p class="text-green-700 underline font-bold text-lg md:text-xl cursor-pointer" @click="openChat">Open a Chat</p>
					</div>
				</div>
			</div>
		</section>
		<section class="bg-tan-200 w-full py-12 pb-20">
			<div class="flex flex-col container xl:max-w-6xl px-6 lg:px-0 m-auto items-center justify-center">
				<div class="flex flex-col py-8 max-w-3xl mx-auto text-left w-full">
					<h2 class="py-4 text-center">Common Questions</h2>
					<ClientOnly>
						<FAQBody />
					</ClientOnly>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I have a question about Cottage...");
}

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
