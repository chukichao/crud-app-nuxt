<template>
  <ul>
    <li @click="prevPage">{{ '<' }}</li>
    <li
      v-for="currentPage in postsStore.totalPages"
      :key="currentPage"
      :class="{
        active: postsStore.page === currentPage,
        visible:
          postsStore.page < currentPage - 2 ||
          postsStore.page > currentPage + 2,
      }"
      @click="setPage(currentPage)"
    >
      {{ currentPage }}
    </li>
    <li @click="nextPage">{{ '>' }}</li>
  </ul>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts.ts';

const postsStore = usePostsStore();

const router = useRouter();

const updateQuery = () => {
  router.replace({
    query: {
      page: postsStore.page,
      limit: postsStore.limit,
    },
  });
};

const setPage = (currentPage: number) => {
  postsStore.setPage(currentPage);

  updateQuery();
};

const prevPage = () => {
  postsStore.prevPage();

  updateQuery();
};

const nextPage = () => {
  postsStore.nextPage();

  updateQuery();
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;

  margin: 3rem auto;

  list-style: none;

  li {
    padding: 1.5rem;

    border: 1px solid #333;

    &:hover {
      color: white;

      background-color: black;
      cursor: pointer;
    }
  }

  .active {
    color: white;

    background-color: black;
  }

  .visible {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  ul {
    li {
      padding: 0.5rem;
    }
  }
}
</style>
