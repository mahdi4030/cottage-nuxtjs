<template>
	<div>
		<div class="bg-forrest-700 side-bar" :class="[isHidden ? 'collapsed' : '']">
			<div class="cursor-pointer relative flex flex-row items-baseline text-left justify-left mr-4 my-5 ml-6" @click="toggleSidebar">
				<div>
					<WhiteCottageLogo class="w-auto h-10 mx-1" :class="[isHidden ? 'hidden sm:block' : '']" />
				</div>
				<div class="logo-transition">
					<WhiteCottageText />
				</div>
				<button class="logo-name__button transition">
					<nuxt-icon id="logo-name__icon" name="arrow-from-right" class="logo-name__icon"></nuxt-icon>
				</button>
			</div>
			<div
				v-for="route in routes"
				:key="route.title"
				class="nav-item"
				:class="[currentRoute == route.routeName ? 'bg-[#125650]' : 'bg-forrest-700 ', isHidden ? 'hidden sm:block' : '']"
			>
				<div v-if="currentRoute == route.routeName" class="bg-green-700 w-2 rounded-r-lg absolute h-[3.7rem]">&nbsp;</div>
				<a @click="navigateToRoute(route)">
					<div class="p-4 flex pl-8 relative" :class="[!route.isEnabledPreReg && isDisabledLinks ? 'opacity-50 cursor-not-allowed' : '']">
						<nuxt-icon :name="route.iconName" class="block min-w-fit text-2xl mx-1" filled />
						<!-- <nuxt-icon :name="route.iconName" class="sm:hidden min-w-fit text-2xl mx-1 text-forrest-700" /> -->
						<span
							class="text-lg text-white ml-2 transition"
							:class="[currentRoute == route.routeName ? 'font-bold whitespace-nowrap' : '', isHidden ? 'hidden' : '']"
						>
							{{ route.title }}
						</span>
						<span class="tooltip">{{ route.title }}</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import WhiteCottageLogo from "@/assets/img/logo/cottage-logo-white.svg?component";
import WhiteCottageText from "@/assets/img/logo/cottage-text-white.svg?component";

const { resident } = useStore("resident");

const props = defineProps({
	activeRoute: {
		type: String,
	},
	isHidden: {
		type: Boolean,
		default: true,
	},
});

const isDisabledLinks = ref(true);
onMounted(() => {
	isDisabledLinks.value = !resident.value.isRegistrationComplete;
});

function navigateToRoute(route) {
	if (!route.isEnabledPreReg && !resident.value.isRegistrationComplete) {
		return;
	}
	navigateTo(route.route);
}

const routes = computed(() => {
	return [
		{
			routeName: "app-overview",
			route: "/app/overview",
			title: "Overview",
			iconName: "overview",
			isEnabledPreReg: true,
		},
		// {
		// 	routeName: "app-power-ups",
		// 	route: "/app/power-ups",
		// 	title: "Power-Ups",
		// 	iconName: "power-up",
		// },
		{
			routeName: "app-insights",
			route: "/app/insights",
			title: "Insights",
			iconName: "bar-graph",
			isEnabledPreReg: false,
		},
		// {
		// 	routeName: "app-billing",
		// 	route: "/app/billing",
		// 	title: "Billing",
		// 	iconName: "card",
		// },
		{
			routeName: "app-support",
			route: "/app/support",
			title: "Support",
			iconName: "lifesaver-menu",
			isEnabledPreReg: true,
		},
		{
			routeName: "app-services",
			route: "/app/services",
			title: "Services",
			iconName: "services",
			isEnabledPreReg: false,
		},
	];
});

const emit = defineEmits(["toggleSidebar"]);

const currentRoute = toRef(props, "activeRoute");

function toggleSidebar(): void {
	emit("toggleSidebar");
}
</script>

<style lang="sass" scoped>

.nav-item
  height: 3.7rem
  // display: flex

.transition,
.logo-transition
  transition: all .5s ease
  opacity: 1

.side-bar
  width: 17rem
  height: 100%
  position: fixed
  transition: all 0.5s ease
  z-index: 40
  border-top-right-radius: 0.5rem
  border-bottom-right-radius: 0.5rem

.logo-name__button
  background-color: transparent
  border: none
  cursor: pointer
  font-size: 1.8rem
  top: 70%
  position: absolute
  left: 80%
  transform: translateY(-50%)
  color: white

.logo-name__icon
  font-size: 1.8rem
  color: var(--grey-color)

// .side-bar.collapsed .message:hover .tooltip,
.features-item:hover .tooltip,
.category-item:hover .tooltip,
.chat-new-btn:hover .tooltip
  top: 50%
  transform: translateY(-50%)
  transition: all 0.5s ease
  opacity: 1


.side-bar.collapsed .logo-transition,
.side-bar.collapsed .transition
  opacity: 0
  pointer-events: none

.tooltip
  position: absolute
  top: 0rem
  left: 5rem
  background-color: white
  color: var(--background-color)
  border-radius: .5rem
  padding: 0.5rem 1rem
  font-size: 1.5rem
  transition: 0s
  opacity: 0
  display: none
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2)
  pointer-events: none !important
  white-space: nowrap

.nav-item:hover .tooltip
  top: 50%
  transform: translateY(-25%)
  transition: all 0.5s ease
  opacity: 1

.side-bar.collapsed
  width: 5.5rem

.side-bar.collapsed .tooltip
  display: block

@media (max-width: 640px)
  .side-bar.collapsed
    width: 0rem
</style>
