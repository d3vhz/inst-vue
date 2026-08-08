<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';

import { PostCard, useGetPostList } from '~/entities/post';
import { useQueryFilters } from '~/shared/ui';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  showDetails?: boolean;
}>();

const { queryParams } = useQueryFilters();

const { data, isPending, isError, error } = useGetPostList(queryParams);

const postList = computed(() => {
  return data.value?.posts ?? [];
});
</script>

<template>
  <div v-if="isPending">...Loading</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <div v-else-if="!postList.length">No data</div>
  <div v-else :class="props.class">
    <PostCard
      v-for="post in postList"
      :key="post.id"
      :post="post"
      :show-details="props.showDetails"
    />
  </div>
</template>
