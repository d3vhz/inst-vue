<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { Input } from '../../input';
import { Select } from '../../select';
import { useQueryFilters } from '../composables';
import { QUERY_FILTER_TYPE } from '../config';
import type { IQueryFilterProps } from '../model';

const props = defineProps<IQueryFilterProps>();

const route = useRoute();

const { setFilter } = useQueryFilters();

const handleDebouncedValueChange = useDebounceFn(setFilter, 500);

const handleChange = (value: string) => {
  handleDebouncedValueChange(props.queryKey, value);
};

const queryValue = computed(
  () => (route.query[props.queryKey] as string) ?? ''
);
</script>

<template>
  <Select
    v-if="type === QUERY_FILTER_TYPE.Select"
    v-bind="filterProps"
    :model-value="queryValue"
    :items="filterProps.items"
    @update:model-value="handleChange"
  />
  <Input
    v-else
    v-bind="filterProps"
    :model-value="queryValue"
    @input="
      (event: Event) => handleChange((event.target as HTMLInputElement).value)
    "
  />
</template>
