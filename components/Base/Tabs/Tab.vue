<template>
	<section v-show="isActive" :id="hash" :aria-hidden="!isActive" class="tabs-container">
		<slot />
	</section>
</template>

<script setup lang="ts">
import { inject, getCurrentInstance } from "vue";

const isActive = ref(false);

const props = defineProps({
	id: {
		default: null,
		type: String,
		required: true,
	},
	name: {
		required: true,
		type: String,
	},
	isDisabled: {
		default: false,
		type: Boolean,
	},
	callback: {
		default() {
			return [];
		},
	},
});

const hash = computed(() => {
	return `#${props.id.toLowerCase().replace(/ /g, "-")}`;
});

const { registerChild, unregisterChild } = inject("TabContainer");
const instance = getCurrentInstance();
const childInfo = {
	id: props.id,
	name: props.name,
	isDisabled: props.isDisabled,
	callback: props.callback,
	isActive,
	hash,
	content: instance.slots.default,
};
registerChild(childInfo);

onBeforeUnmount(() => {
	unregisterChild(childInfo);
});
</script>
