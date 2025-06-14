<template>
	<header class="header">
		<nav>
			<ul>
				<TheLogo />
				<li :class="{ active: $route.path === '/' }">
					<NuxtLink to="/">Home</NuxtLink>
				</li>

				<li :class="{ active: $route.path === '/about' }">
					<NuxtLink to="/about">About Us</NuxtLink>
				</li>

				<li v-if="userStore.auth" :class="{ active: $route.path === '/posts' }">
					<NuxtLink
						:to="{
							path: '/posts',
							query: { page: postsStore.page, limit: postsStore.limit },
						}"
						>Posts</NuxtLink
					>
				</li>
			</ul>
		</nav>

		<div v-if="userStore.auth">
			<UIButton @click="uiStore.openModal('logout')">Logout</UIButton>
		</div>

		<div v-else>
			<UIButton><NuxtLink to="/signup">Sign up</NuxtLink></UIButton>

			<UIButton @click="uiStore.openModal('login')">Sign in</UIButton>
		</div>

		<UIModal v-if="uiStore.modal.type === 'login'">
			<FormLogin />
		</UIModal>

		<UIModal v-if="uiStore.modal.type === 'logout'">
			<h2>Are you sure?</h2>
			<UIButton @click="logout">Yes</UIButton>
			<UIButton @click="uiStore.closeModal">No</UIButton>
		</UIModal>
	</header>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";
import { useUIStore } from "~/stores/ui";
import { useUserStore } from "~/stores/user";

const uiStore = useUIStore();
const userStore = useUserStore();
const postsStore = usePostsStore();

const router = useRouter();

const logout = () => {
	userStore.logout();
	uiStore.closeModal();
	router.push("/");
};
</script>

<style scoped lang="scss">
.header {
	display: flex;
	justify-content: space-between;

	width: 100%;

	font-size: 25px;

	ul {
		display: flex;

		list-style: none;

		li {
			padding: 1.5rem;
		}
	}

	a {
		color: inherit;
		text-decoration: none;

		&:hover {
			text-shadow: 1px 1px 1px #333;

			cursor: pointer;
		}
	}

	button {
		margin-right: 1rem;
		padding: 2rem;

		font-size: 23px;

		border: none;

		transition: 2s linear;

		&:hover {
			transform: scale(1.1);
		}
	}
}

.active {
	font-weight: bold;
}

@media screen and (max-width: 600px) {
	.header {
		ul {
			flex-direction: column;
		}
	}
}
</style>
