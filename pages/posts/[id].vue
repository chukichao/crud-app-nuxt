<template>
	<main>
		<Head>
			<Title>Comments id{{ route.params.id }} </Title>
			<Meta name="Comments" content="list of comments" />
		</Head>

		<h1 id="heading">Comments Page</h1>

		<div class="comments-list">
			<div v-if="commentsStore.comments.length" class="comments-item">
				<ul>
					<li v-for="comment in commentsStore.comments" :key="comment.id">
						<h3>{{ comment.id }}. {{ comment.name }}</h3>
						<p>{{ comment.body }}</p>
						<p>{{ comment.email }}</p>
					</li>
				</ul>
			</div>

			<div v-else>
				<UILoader v-if="uiStore.isLoading" />
				<h2 v-else>No comments yet</h2>
			</div>

			<UIButton
				@click="
					$router.push(
						`/posts?page=${postsStore.page}&limit=${postsStore.limit}`,
					)
				"
				>Back</UIButton
			>
		</div>
	</main>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";
import { useUIStore } from "~/stores/ui";
import { useCommentsStore } from "~/stores/сomments";

definePageMeta({
	layout: "custom",
	middleware: "auth",
});

const commentsStore = useCommentsStore();
const uiStore = useUIStore();
const postsStore = usePostsStore();

const route = useRoute();

const scrollToUp = () => {
	const heading = document.getElementById("heading");

	if (heading) {
		heading.scrollIntoView();
	}
};

onMounted(() => {
	commentsStore.fetchComments(route.params.id as string);
	scrollToUp();
});
</script>

<style scoped lang="scss">
.comments-list {
	text-align: center;

	h2 {
		padding: 1.5rem;

		font-size: 30px;
	}
}

.comments-item {
	display: flex;
	flex-direction: column;
	justify-content: center;

	ul {
		list-style: none;

		li {
			margin: 2rem 0;
		}

		p {
			padding: 1rem;
		}
	}

	button {
		align-self: flex-end;

		margin: 1rem;

		&:hover {
			background: bisque;
		}
	}
}
</style>
