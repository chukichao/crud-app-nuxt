<template>
	<div class="logo">crudApp<span v-blink.hover>_</span></div>
</template>

<style scoped lang="scss">
.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 1rem;

	padding: 1.5rem;

	transition: 2s linear;

	&:hover {
		transform: scale(1.1);
		cursor: default;
	}
}
</style>
