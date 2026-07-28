<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { DEBOUNCE_TIME } from '~/shared/config';

import { Input } from '../../input';
import { Select } from '../../select';
import { useQueryFilters } from '../composables';
import { QUERY_FILTER_TYPE } from '../config';
import type { IQueryFilterProps } from '../model';

const props = defineProps<IQueryFilterProps>();

const route = useRoute();

const { setFilter } = useQueryFilters();

const handleDebouncedValueChange = useDebounceFn(setFilter, DEBOUNCE_TIME);

const handleChange = (value: string | number) => {
  handleDebouncedValueChange(props.queryKey, String(value));
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
    @update:model-value="handleChange"
  />
</template>
