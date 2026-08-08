<script setup lang="ts">
import { PostList } from '~/features/post-list';
import { Button, QueryFilter, useQueryFilters } from '~/shared/ui';
import { DefaultLayout } from '~/widgets/layouts';

import { filters } from '../config';

const { resetAllFilters } = useQueryFilters();
</script>

<template>
  <DefaultLayout>
    <div class="space-y-4">
      <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <QueryFilter
          v-for="filter in filters"
          :key="filter.queryKey"
          :type="filter.type"
          :query-key="filter.queryKey"
          :filter-props="filter.filterProps"
        />
        <div>
          <Button variant="muted" size="sm" @click="resetAllFilters">
            Clear Filters
          </Button>
        </div>
      </div>
      <PostList class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3" />
    </div>
  </DefaultLayout>
</template>
