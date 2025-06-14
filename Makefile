eslint:
	npx eslint src

prettier:
	npx prettier --write components/**/*

stylelint:
	npx stylelint "src/**/*.{css,scss,vue}"

typescript:
	npx nuxt typecheck