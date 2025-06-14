<template>
	<div>
		<h2>Login</h2>

		<form class="form" @submit.prevent="login">
			<UIInput
				v-model.trim="user.username"
				v-focus
				:class="{ ['error-outline']: errorLogin }"
				autocomplete="username"
				placeholder="username"
			/>

			<UIInput
				v-model.trim="user.password"
				:class="{ ['error-outline']: errorLogin }"
				type="password"
				autocomplete="current-password"
				placeholder="password"
			/>

			<div v-show="errorLogin" class="error-feedback">
				Incorrect username or password
			</div>

			<UIButton
				:disabled="disabledButton"
				:class="{ ['active-button']: !disabledButton }"
				>Sign in</UIButton
			>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useUIStore } from "~/stores/ui";
import { useUserStore } from "~/stores/user";

import type { IUser } from "~/types/user";

const uiStore = useUIStore();
const userStore = useUserStore();

const router = useRouter();

let user = reactive({
	username: "",
	password: "",
});

const errorLogin = ref(false);

const login = () => {
	const database = JSON.parse(localStorage.getItem("database") as string);
	const userData = database.users.find(
		(_user: IUser) => _user.username === user.username,
	);

	if (!userData || userData.password !== user.password) {
		errorLogin.value = true;
		return;
	}

	errorLogin.value = false;

	const authData = {
		username: user.username,
		token: String(Math.random()).slice(2),
	};
	userStore.login(authData, userData);

	user = {
		username: "",
		password: "",
	};

	uiStore.closeModal();
	router.push("/");
};

const disabledButton = computed(() => {
	if (user.username.length >= 1 && user.password.length >= 1) {
		return false;
	}

	return true;
});
</script>

<style scoped lang="scss">
h2 {
	margin: 1rem 0;

	font-size: 30px;
}

.form {
	display: flex;
	flex-direction: column;

	input {
		&:focus {
			outline: 1px solid #333;
		}
	}

	button {
		align-self: flex-end;
		margin-top: 1rem;
	}
}

.active-button {
	&:hover {
		background: bisque;
	}
}

.error-outline {
	border: 2px solid red;
}

.error-feedback {
	align-self: flex-start;

	color: red;
	font-size: 10px;
}
</style>
