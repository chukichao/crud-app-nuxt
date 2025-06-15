<template>
	<main>
		<div class="status">
			<div>
				<h1>This page was not found</h1>
				<NuxtLink to="/">Go home page</NuxtLink>
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
.status {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;

	text-align: center;

	h2 {
		margin: 3rem;
	}

	a {
		color: inherit;
		font-size: 30px;
		text-decoration: none;
	}
}
</style>
