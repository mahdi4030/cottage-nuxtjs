import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
		if (to.name !== from.name) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						left: savedPosition?.left || 0,
						top: savedPosition?.top || 0,
					});
				}, 0);
			});
		}
	};
});
