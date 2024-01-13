<template>
	<div class="flex flex-col container m-auto items-center md:px-6 xl:max-w-6xl">
		<h2 class="text-center leading-tight">Creating your profile...</h2>
		<ClientOnly>
			<OAuthSuccess />
			<template #fallback>
				<div class="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
					<div class="py-12">
						<nuxt-icon name="logo-flattened-animated" style="font-size: 160px; stroke-width: 4" filled />
					</div>
				</div>
			</template>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts"></script>
