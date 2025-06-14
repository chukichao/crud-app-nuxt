eslint:
	npx eslint

prettier:
	npx prettier --write components/
	npx prettier --write composables/
	npx prettier --write layouts/
	npx prettier --write middleware/
	npx prettier --write pages/
	npx prettier --write plugins/
	npx prettier --write server/
	npx prettier --write stores/
	npx prettier --write types/

stylelint:
	npx stylelint --fix "components/**/*.{css,scss,vue}"
	npx stylelint --fix "layouts/**/*.{css,scss,vue}"
	npx stylelint --fix "pages/**/*.{css,scss,vue}"

typescript:
	npx nuxt typecheck