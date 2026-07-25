<script setup lang="ts">
import { computed } from 'vue';

import { useGetPostList } from '~/entities/post';

const { isPending, isError, data, error } = useGetPostList();

const postList = computed(() => {
  return data.value?.data?.posts ?? [];
});
</script>

<template>
  <div class="py-4">
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <template v-else>
      <div v-for="post in postList" :key="post.id">
        <p>{{ post.caption }}</p>
        <p class="mt-0">{{ post.status }}</p>
      </div>
    </template>
  </div>
</template>
