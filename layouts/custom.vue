<template>
	<slot />

	<CookieAlert v-show="uiStore.cookieAlert" />
</template>

<script setup lang="ts">
import { useStorage } from "../composables/useStorage";

import { useUserStore } from "~/stores/user.ts";
import { useUIStore } from "~/stores/ui.ts";

import type { IUser } from "~/types/user.ts";

const userStore = useUserStore();
const uiStore = useUIStore();

const { hasDataLocalStorage } = useStorage();

onMounted(() => {
	if (!hasDataLocalStorage("database")) {
		localStorage.setItem(
			"database",
			JSON.stringify({
				users: [
					{
						username: "admin",
						password: "admin",
						age: 0,
						isAgreeWithRules: true,
						id: String(Math.random()).slice(2),
					},
				],
			}),
		);
	}

	if (hasDataLocalStorage("auth")) {
		const user = JSON.parse(localStorage.getItem("auth") as string);
		const database = JSON.parse(localStorage.getItem("database") as string);

		const userData = database.users.find(
			(_user: IUser) => _user.username === user.username,
		);

		userStore.login(user, userData);
	}

	if (hasDataLocalStorage("cookie")) {
		uiStore.closeCookieAlert();
	}
});
</script>

<style lang="scss">
main {
	display: flex;
	flex-direction: column;

	max-width: 700px;

	margin: 0 auto;
	padding: 2rem;

	h1 {
		margin: 5rem auto;

		font-size: 2rem;

		text-align: center;
	}
}

@media screen and (max-width: 600px) {
	main {
		min-width: 250px;
	}
}
</style>
