<template>
	<div class="cookie-alert">
		<h3>Welcome!</h3>
		<p>
			Our platform uses cookies to ensure the correct operation of the site and
			your comfortable interaction with it.
		</p>
		<UIButton @click="uiStore.closeCookieAlert">Accept</UIButton>
	</div>
</template>

<script setup lang="ts">
import { useUIStore } from "~/stores/ui.ts";

const uiStore = useUIStore();
</script>

<style scoped lang="scss">
.cookie-alert {
	position: fixed;
	bottom: 0;
	left: 0;

	width: 400px;

	padding: 1rem 2rem;

	background: bisque;
	border: 2px solid #333;
	border-radius: 5px;

	p {
		margin: 1rem 0;
	}

	button {
		background-color: white;
		border-radius: 5px;
	}
}
</style>
