<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

import { type IGetPostListParams, useGetPostList } from '~/entities/post';
import { Button, QueryFilter, useQueryFilters } from '~/shared/ui';

import { filters } from '../config';

import PostCard from './PostCard.vue';

const { resetAllFilters, queryParams } = useQueryFilters();

const { data, isPending, isError, error } = useGetPostList(
  queryParams as ComputedRef<IGetPostListParams>
);

const postList = computed(() => {
  return data.value?.data?.posts ?? [];
});
</script>

<template>
  <div class="space-y-4 py-4">
    <div
      class="grid grid-cols-1 items-center gap-4 md:grid-cols-3 lg:grid-cols-3"
    >
      <QueryFilter
        v-for="filter in filters"
        :key="filter.queryKey"
        :type="filter.type"
        :query-key="filter.queryKey"
        :filter-props="filter.filterProps"
      />
      <div>
        <Button variant="secondary" size="sm" @click="resetAllFilters">
          Clear Filters
        </Button>
      </div>
    </div>
    <div v-if="isPending">...Loading</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="!postList.length">No data</div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in postList" :key="post.id" :post="post" />
    </div>
  </div>
</template>
