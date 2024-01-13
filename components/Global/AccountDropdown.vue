<template>
	<div>
		<ClientOnly>
			<Menu v-if="resident !== undefined" as="div" class="relative text-left z-40">
				<div>
					<MenuButton
						class="inline-flex justify-center w-full rounded-xl border border-border account-dropdown p-1 sm:p-2 bg-white text-sm font-medium text-forrest-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-700"
					>
						<div class="flex items-center">
							<div class="bg-green-700 rounded-lg mr-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
								<div v-if="resident.firstName" class="text-white font-cooper text-lg sm:text-xl p-1.5">
									{{ resident.firstName.charAt(0) + resident.lastName.charAt(0) }}
								</div>
							</div>
							<div class="hidden sm:block text-xl font-medium text-forrest-700 pl-1">
								{{ resident.firstName }}
							</div>
							<nuxt-icon name="dropdown-arrow" class="text-sm md:text-xl sm:ml-2 text-green-700 sm:px-2" filled />
						</div>
					</MenuButton>
				</div>

				<transition
					enter-active-class="transition ease-out duration-100"
					enter-from-class="transform opacity-0 scale-95"
					enter-to-class="transform opacity-100 scale-100"
					leave-active-class="transition ease-in duration-75"
					leave-from-class="transform opacity-100 scale-100"
					leave-to-class="transform opacity-0 scale-95"
				>
					<MenuItems
						class="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-white ring-1 ring-border focus:outline-none"
					>
						<div class="py-2 px-3">
							<div class="py-3 pb-4 px-0 mx-4 text-xl font-medium border-b border-border">
								{{ resident.firstName + " " + resident.lastName }}
							</div>
							<MenuItem v-slot="{ active, close }">
								<nuxt-link
									to="/app/account"
									@click="close"
									:class="[active ? 'bg-gray-100 text-green-700' : 'text-gray-700', 'block px-3 py-3 text-lg rounded-lg mt-2']"
								>
									<span class="flex flex-row text-xl">
										<nuxt-icon name="user" class="min-w-fit text-2xl mr-3" filled />
										Profile
									</span>
								</nuxt-link>
							</MenuItem>
							<!-- <MenuItem v-slot="{ active, close }">
								<nuxt-link
									to="/app/support"
									@click="close"
									:class="[active ? 'bg-gray-100 text-green-700' : 'text-gray-700', 'block px-3 py-3 text-lg rounded-lg']"
								>
									<span class="flex flex-row text-xl">
										<nuxt-icon name="lifesaver" class="min-w-fit text-2xl mr-3" filled />
										Support
									</span>
								</nuxt-link>
							</MenuItem> -->
							<MenuItem v-slot="{ active }">
								<button
									:class="[active ? 'bg-gray-100 text-green-700' : 'text-gray-700', 'block px-3 py-3 text-lg rounded-lg w-full']"
									@click="logout"
								>
									<span class="flex flex-row text-xl">
										<nuxt-icon name="logout" class="min-w-fit text-2xl mr-3" filled />
										Logout
									</span>
								</button>
							</MenuItem>
						</div>
					</MenuItems>
				</transition>
			</Menu>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const { resident } = useStore("resident");
const auth = useAuth();

async function logout() {
	if (await auth.logout()) {
		return navigateTo("/");
	}
}
</script>

<style lang="sass" scoped>
.account-dropdown
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)
</style>
