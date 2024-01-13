<template>
	<div>
		<NuxtLayout name="external" :show-header-buttons-prop="false" :is-light-nav-prop="true">
			<NuxtPage id="partner-page" />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	// layout: "onboarding",
	layout: false,
});
</script>
