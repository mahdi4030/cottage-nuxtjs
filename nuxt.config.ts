import svgLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import PiniaAutoRefs from "pinia-auto-refs";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// ssr: false,
	app: {
		head: {
			title: "Cottage - A Smarter Way to Manage Energy!",
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, viewport-fit=cover",
				},
				{ name: "apple-mobile-web-app-capable", content: "yes" },
				{
					name: "apple-mobile-web-app-status-bar-style",
					content: "black-translucent",
				},
				{ hid: "description", name: "description", content: "" },
				{
					name: "description",
					content:
						"We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
				},
				{ property: "og:url", content: process.env.SITE_URL },
				{ property: "og:type", content: "website" },
				{
					property: "og:title",
					content: "Cottage - A Smarter Way to Manage Energy",
				},
				{
					property: "og:description",
					content:
						"We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
				},
				{
					property: "og:image",
					content: "https://cottage-public-assets.s3.amazonaws.com/img/cottage-social-share.png",
				},
				{ name: "twitter:card", content: "summary_large_image" },
				{ property: "twitter:domain", content: "energybycotage.com" },
				{ property: "twitter:url", content: process.env.SITE_URL },
				{
					name: "twitter:title",
					content: "Cottage - A Smarter Way to Manage Energy",
				},
				{
					name: "twitter:description",
					content:
						"We think energy is too complicated. Instead, we manage your electricity bill and ensure you have the best rates. And it is free.",
				},
				{
					name: "twitter:image",
					content: "https://cottage-public-assets.s3.amazonaws.com/img/cottage-social-share.png",
				},
			],
			script: [
				{
					src: process.env.NODE_ENV === "production" ? "https://www.googletagmanager.com/gtag/js?id=G-JRMNKB3SHX" : "",
					async: true,
				},
				{
					src: process.env.NODE_ENV === "production" ? "/js/gtag.js" : "",
					body: true,
				},
				{
					src: "/js/intercom.js",
					body: true,
				},
			],
		},
		pageTransition: false,
		layoutTransition: false,
	},

	css: ["@/assets/css/fonts.css", "@/assets/sass/global.sass"],

	runtimeConfig: {
		MAILER_SEND_API_KEY: process.env.MAILER_SEND_API_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		UTILITY_CONNECT_URL: process.env.UTILITY_CONNECT_URL,
		PRIVATE_API_SECRET_KEY: process.env.PRIVATE_API_SECRET_KEY,
		// CONED ENV KEYS
		public: {
			NODE_ENV: process.env.NODE_ENV,
			ENVIRONMENT: process.env.ENVIRONMENT,
			SITE_URL: process.env.SITE_URL,
			// STRIPE COLLECTIONS
			STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
		},
	},

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	vite: {
		server: {
			port: 3000,
		},
		plugins: [
			svgLoader(),
			AutoImport({
				dts: true,
				imports: [
					"pinia",
					{
						"@/helper/pinia-auto-refs": ["useStore"],
					},
				],
			}),
			// PiniaAutoRefs({ storeDir: "store", outputFile: "helper/pinia-auto-refs.ts" }),
		],
		css: {
			preprocessorOptions: {
				sass: {
					// eslint-disable-next-line quotes
					additionalData: '@use "@/assets/sass/_variables.sass" as *\n',
				},
			},
		},
		optimizeDeps: {
			include: ["@headlessui/vue", "@heroicons/vue/24/solid", "@heroicons/vue/24/outline", "vue", "pinia"],
		},
		ssr: {
			noExternal: ["@googlemaps/js-api-loader"],
		},
	},

	modules: [
		"@nuxtjs/tailwindcss",
		"nuxt-icons",
		"@nuxtjs/supabase",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		// "nuxt-bugsnag",
		"nuxt-swiper",
	],
	// buildModules: ["floating-vue/nuxt"],

	build: {
		transpile: ["@headlessui/vue", "resize-detector", /echarts/, "vue-echarts", "@heroicons/vue"],
	},

	supabase: {
		client: {
			cookieOptions: {
				domain: "energybycottage.com",
			},
		},
	},

	// bugsnag: {
	// 	publishRelease: true,
	// 	baseUrl: "http://energybycottage.com",
	// 	config: {
	// 		apiKey: "29515c44f1ec724f8f86ed899811a57c",
	// 		enabledReleaseStages: ["staging", "production"],
	// 		releaseStage: process.env.NODE_ENV,
	// 		appVersion: "1.1",
	// 	},
	// },

	nitro: {
		externals: {
			inline: ["date-fns"],
		},
	},
	experimental: { inlineSSRStyles: false },
});
