export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	css: ["~/assets/main.scss"],
	app: {
		head: {
			title: "Nuxt",
		},
	},
	alias: {
		assets: "/<rootDir>/assets",
	},
	typescript: {
		typeCheck: true,
	},
	modules: ["@pinia/nuxt"],
	ssr: false,
});
