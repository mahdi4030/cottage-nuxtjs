<template>
	<div class="tabs-component">
		<div class="sm:hidden mb-4">
			<label for="tabs" class="sr-only">Select a tab</label>
			<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
			<select
				id="tabs"
				name="tabs"
				class="bg-white block w-full rounded-lg border border-border shadow-sm py-3 px-4 text-lg focus:border-green-700 focus:outline-none focus:ring-green-700"
				@change="selectTabByIndex($event.target.selectedIndex)"
			>
				<option v-for="(tab, i) in tabs" :key="i" :selected="tab.isActive">{{ tab.name }}</option>
			</select>
		</div>
		<ul id="tabs-tab" class="hidden sm:flex nav nav-tabs flex-row flex-wrap list-none border-b border-border pl-0 mb-4" role="tablist">
			<li
				v-for="(tab, i) in tabs"
				:key="i"
				:class="{
					'is-active': tab.isActive,
					'is-disabled': tab.isDisabled,
				}"
				class="nav-item"
				role="presentation"
			>
				<a
					:aria-controls="tab.hash"
					:aria-selected="tab.isActive"
					:href="tab.hash"
					:class="[
						'block font-bold border-x-0 border-t-0 text-xl border-b-0 px-4 mr-4 py-3 mt-2',
						activeIndex === i ? 'border-b-4 border-green-700' : 'border-border',
					]"
					role="tab"
					@click="
						() => {
							selectTabByIndex(i);
						}
					"
					v-html="tab.name"
				></a>
			</li>
		</ul>
		<div class="tab-content">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const tabs = ref([]);
const activeHash = ref("");
const activeIndex = ref(0);
const tabHashes = ref();

onMounted(() => {
	tabHashes.value = tabs.value.map((tab) => tab.hash);

	window.addEventListener("hashchange", () => selectTabByHash(window.location.hash));
	window.location.hash !== "" ? selectTabByHash(window.location.hash) : selectTabByIndex(0);
});

const registerChild = (child) => tabs.value.push(child);
const unregisterChild = (child) => {
	tabs.value = tabs.value.filter((registeredChild) => registeredChild !== child);
};

provide("TabContainer", { registerChild, unregisterChild });

function selectTabByHash(hash: string): null {
	if (!hash) return;
	if (!tabHashes.value.includes(hash)) return;

	activeIndex.value = tabHashes.value.indexOf(hash);
	const currentTab = tabs.value[activeIndex.value];

	tabs.value.forEach((tab) => {
		tab.isActive = tab.hash === hash;
	});

	currentTab.callback();
}

function selectTabByIndex(index: number): null {
	if (!Number.isInteger(index)) return;
	if (tabs.value.length < index) return;

	activeIndex.value = index;
	const currentTab = tabs.value[index];

	tabs.value.forEach((tab, tabIndex) => {
		tab.isActive = tabIndex === index;
	});

	currentTab.callback();
}
</script>
