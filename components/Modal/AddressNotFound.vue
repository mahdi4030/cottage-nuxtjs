<template>
	<ModalInfo :is-modal-open="isOpen" @closeModal="closeAction" max-width="max-w-2xl">
		<template #header>Address not listed in the dropdown?</template>
		<template #body>
			<div class="flex flex-col pt-4 md:px-16 text-center">
				<p class="text-lg md:text-xl">Give us a call at <span class="text-green-700">(646) 847-7885</span></p>
				<p class="py-2 text-lg md:text-xl">or</p>
				<p class="text-green-700 underline font-bold text-lg md:text-xl cursor-pointer" @click="openChat">Open a Chat</p>
			</div>
		</template>
	</ModalInfo>
</template>

<script lang="ts">
export {};
</script>
<script lang="ts" setup>
const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
});

function openChat() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Intercom("showNewMessage", "I can't find my address");
}

const emit = defineEmits(["closeAction"]);
function closeAction() {
	emit("closeAction");
}
</script>
