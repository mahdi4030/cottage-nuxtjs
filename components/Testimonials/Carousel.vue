<template>
	<div class="flex w-full">
		<Swiper
			:space-between="16"
			:autoplay="{ delay: 3000 }"
			:loop="true"
			:speed="1200"
			:modules="[SwiperAutoplay]"
			:breakpoints="breakpoints"
			class="w-full"
		>
			<SwiperSlide v-for="(t, i) in testimonials" :key="i" class="flex p-2">
				<div class="relative rounded-2xl bg-white p-6 shadow-lg break-inside-avoid-column">
					<nuxt-icon name="quote" class="absolute top-6 left-6 text-border/30 text-8xl" />
					<div class="relative">
						<p class="text-lg tracking-tight leading-snug text-textblack">
							{{ t.quote }}
						</p>
						<div class="relative mt-3 flex items-center justify-between border-t border-border/50 pt-3"></div>
						<div>
							<div class="text-lg text-forrest-700 font-semibold">{{ t.name }}</div>
							<div class="text-sm text-gray-500">{{ t.location }}</div>
						</div>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ComputedRef, computed } from "vue";

interface Testimonial {
	quote: string;
	name: string;
	location: string;
}

const breakpoints = computed(() => {
	return {
		640: {
			slidesPerView: 1,
			spaceBetween: 16,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
	};
});

const testimonials: ComputedRef<Testimonial[]> = computed(() => {
	return [
		{
			name: "Amy H.",
			location: "New York, NY",
			quote: "Switching to renewable energy was a breeze with Cottage! Their customer service was very helpful and made the process stress-free.",
		},
		{
			name: "Akshay S.",
			location: "Chicago, IL",
			quote: "I never thought I'd be able to afford renewable energy, but Cottage made it possible. The switch was hassle-free and I'm already seeing the benefits on my monthly energy bills.",
		},
		{
			name: "James M.",
			location: "Hudson Valley, NY",
			quote: "Cottage made it easy for me to switch to renewable energy as a busy homeowner. Their team was knowledgeable and responsive, and the process was transparent.",
		},
		{
			name: "Heather J.",
			location: "Worstall, NY",
			quote: "Cottage made the switch to renewable energy easy and stress-free. Their customer service was top-notch and always available to help.",
		},
		{
			name: "Monique G.",
			location: "Baltimore, MD",
			quote: "I'm so glad I made the switch to renewable energy with Cottage. Not only did they help me find ways to save money on my energy bills, but I'm also doing my part to reduce my carbon footprint and protect the environment. It's a win-win!",
		},
		{
			name: "Jerome A.",
			location: "Hoboken, NJ",
			quote: "As someone who cares about the planet, switching to renewable energy with Cottage was a no-brainer for me. The process was easy and the benefits for the environment are immeasurable. I'd highly recommend giving it a try!",
		},
	];
});
</script>

<style scoped>
.swiper {
	overflow: visible;
}
.swiper-button-next,
.swiper-button-prev {
	top: 50%;
	transform: translateY(-50%);
}
</style>
