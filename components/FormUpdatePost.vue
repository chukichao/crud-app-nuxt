<template>
	<div>
		<h2>Update post</h2>

		<form class="form" @submit.prevent="updatePost">
			<div>
				<h3>Title:</h3>
				<textarea v-model.trim="post.title" v-focus placeholder="title" />
			</div>

			<div>
				<h3>Body:</h3>
				<textarea v-model.trim="post.body" placeholder="description" />
			</div>

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

const props = defineProps<{ title: string; body: string; id: number }>();

const post = reactive({ title: "", body: "" });

const updatePost = () => {
	if (!post.title || !post.body) {
		return;
	}

	postsStore.updatePost(props.id, post);

	uiStore.closeModal();
};

const disabledButton = computed(() => {
	if (post.title !== props.title || post.body !== props.body) {
		return false;
	}

	return true;
});

onMounted(() => {
	post.title = props.title;
	post.body = props.body;
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
	justify-content: center;

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
