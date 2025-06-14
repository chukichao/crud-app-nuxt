<template>
	<div>
		<h2>Create post</h2>
		<form class="form" @submit.prevent="createPost">
			<textarea ref="textarea" v-model.trim="post.title" placeholder="title" />
			<textarea v-model.trim="post.body" placeholder="description" />
			<UIButton
				:disabled="disabledButton"
				:class="{ ['active-button']: !disabledButton }"
				>Сonfirm</UIButton
			>
		</form>
	</div>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts.ts";
import { useUIStore } from "~/stores/ui.ts";

const postsStore = usePostsStore();
const uiStore = useUIStore();

const textarea = useTemplateRef<HTMLTextAreaElement>("textarea");

let post = reactive({
	title: "",
	body: "",
});

const createPost = () => {
	if (!post.title || !post.body) {
		return;
	}

	postsStore.createPost(post);
	uiStore.closeModal();

	post = {
		title: "",
		body: "",
	};
};

const disabledButton = computed(() => {
	if (post.title.length >= 1 && post.body.length >= 1) {
		return false;
	}

	return true;
});

onMounted(() => {
	textarea.value?.focus();
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

	textarea {
		width: 100%;
		height: 200px;
		margin: 0.5rem auto;

		font-size: 1rem;

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
</style>
