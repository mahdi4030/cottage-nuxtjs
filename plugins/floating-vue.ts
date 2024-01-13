// import FloatingVue from "floating-vue";

// ignore prettier
// export default defineNuxtPlugin((nuxtApp) => {
// 	FloatingVue.options.themes.dark = {
// 		...FloatingVue.options.themes.tooltip,
// 		placement: "top",
// 	};
// 	nuxtApp.vueApp.use(FloatingVue); // <-- I am not sure if we need this
// });

import { defineNuxtPlugin } from "#app";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export default defineNuxtPlugin(({ vueApp }) => {
	FloatingVue.options.themes.dark = {
		...FloatingVue.options.themes.tooltip,
		placement: "top",
	};
	vueApp.use(FloatingVue);
});
