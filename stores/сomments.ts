import { defineStore } from "pinia";
import { useUIStore } from "./ui.js";

import type { IComment } from "~/types/comment.js";

export const useCommentsStore = defineStore("comments", {
	state: () => ({
		comments: [] as IComment[],
	}),
	actions: {
		async fetchComments(id: string) {
			const uiStore = useUIStore();
			try {
				uiStore.isLoading = true;

				const { data: comments } = await $fetch<any>(
					`https://jsonplaceholder.typicode.com/posts/${id}/comments`,
				);

				this.comments = comments.value;
			} catch (error) {
				console.error(error);
			} finally {
				uiStore.isLoading = false;
			}
		},
	},
});
