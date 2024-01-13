<template>
	<component :is="renderComp" v-bind="$attrs" :to="to" :target="target" :disabled="isDisabled">
		<div
			class="focus:outline-none text-white flex items-center justify-center rounded-lg focus:border-transparent ring-transparent focus:ring-transparent focus:ring-0 font-semibold"
			:class="[btnStyle, ...btnType, ...btnSize]"
		>
			<div class="button-icon"><slot name="button-icon"></slot></div>
			<slot />
		</div>
	</component>
</template>

<script setup lang="ts">
const props = defineProps({
	to: {
		type: String,
		default: null,
	},
	btnStyle: {
		type: [String, Array],
		default: "",
	},
	target: {
		type: String,
		default: "_self",
	},
	btnType: {
		type: String,
		default: "primary",
	},
	btnSize: {
		type: String,
		default: "base",
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
});
const renderComp = computed(() => {
	if (props.to) {
		return resolveComponent("NuxtLink");
	} else {
		return "button";
	}
});

const btnType = computed(() => {
	switch (props.btnType) {
		case "secondary":
			if (props.isDisabled) {
				return ["bg-forrest-200"];
			}
			return ["bg-forrest-700", "hover:bg-forrest-900"];
		case "line":
			if (props.isDisabled) {
				return ["bg-gray-100", "!text-green-700", "border-solid", "border", "border-gray-500"];
			}
			return ["bg-white", "hover:bg-gray-100", "!text-green-700", "border-solid", "border", "border-border"];
		case "transparent":
			if (props.isDisabled) {
				return ["!text-gray-400"];
			}
			return ["bg-transparent", "hover:bg-green-50", "!text-green-700"];
		case "logo":
			if (props.isDisabled) {
				return ["bg-gray-100", "text-green-700", "border-solid", "border", "border-gray-500", "shadow-none"];
			}
			return ["bg-white", "hover:bg-gray-100", "text-green-700", "border-solid", "border", "border-gray-300", "py-1", "shadow-none"];
		case "warning":
			return ["bg-rose-600", "hover:bg-red-700"];
		default:
			if (props.isDisabled) {
				return ["bg-green-200"];
			}
			return ["bg-green-700", "hover:bg-green-900"];
	}
});

// refactor to swtich case
const btnSize = computed(() => {
	if (props.btnSize === "base") {
		return ["px-8", "py-2", "h-12", "text-base", "md:text-lg"];
	} else if (props.btnSize === "large") {
		return ["h-12", "px-8", "py-4", "md:h-[3.2rem]", "text-lg", "md:text-xl"];
	} else if (props.btnSize === "small") {
		return ["px-5", "py-2", "h-9", "text-base"];
	}
});
</script>

<style lang="sass" scoped></style>
