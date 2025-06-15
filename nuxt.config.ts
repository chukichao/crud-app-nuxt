export default defineNuxtConfig({
	app: {
		head: {
			title: "Nuxt App",
			meta: [{ name: "description", content: "Educational project" }],
		},
	},
	alias: {
		assets: "/<rootDir>/assets",
	},
	css: ["~/assets/main.scss"],
	modules: ["@pinia/nuxt"],
	typescript: {
		typeCheck: true,
	},
	ssr: false,
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
});
