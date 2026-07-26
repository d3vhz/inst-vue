<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { ref, watch } from 'vue';
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
  currentValue.value = value;
  handleDebouncedValueChange(props.queryKey, value);
};

const currentValue = ref((route.query[props.queryKey] as string) || '');

watch(
  () => route.query[props.queryKey],
  (newValue) => {
    if (newValue) return;
    currentValue.value = '';
  }
);
</script>

<template>
  <Select
    v-if="type === QUERY_FILTER_TYPE.Select"
    v-bind="filterProps"
    :model-value="currentValue"
    :items="filterProps.items"
    @update:model-value="handleChange"
  />
  <Input
    v-else
    v-bind="filterProps"
    :model-value="currentValue"
    @input="
      (event: Event) => handleChange((event.target as HTMLInputElement).value)
    "
  />
</template>
