<template>
	<div class="posts-list">
		<div v-if="posts.length">
			<h2>Post list</h2>
			<h3>(shown {{ postsStore.totalCountPosts }})</h3>

			<TransitionGroup name="list" tag="ul">
				<PostItem v-for="post in posts" :key="post.id" :post="post" />
			</TransitionGroup>
		</div>

		<div v-else>
			<UILoader v-if="uiStore.isLoading" />
			<h2 v-else>No posts</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts.ts";
import { useUIStore } from "~/stores/ui.ts";

import type { IPost } from "~/types/post.ts";

const postsStore = usePostsStore();
const uiStore = useUIStore();

defineProps<{ posts: IPost[] }>();
</script>

<style scoped lang="scss">
.posts-list {
	text-align: center;

	h2 {
		padding: 1.5rem;

		font-size: 30px;
	}

	ul {
		list-style: none;
	}
}

.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-leave-to {
	transform: translateX(130px);
	opacity: 0;
}

.list-enter-from {
	transform: translateX(-130px);
	opacity: 0;
}
</style>
