<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';

import type { IInputProps } from '../../input';
import { Input } from '../../input-group';
import { type ISelectProps, Select } from '../../select';
import { useQueryFilters } from '../composables';
import { QUERY_FILTER_TYPE } from '../config';
import type { IQueryFilterProps } from '../model';

const props = defineProps<IQueryFilterProps>();

const route = useRoute();

const { setFilter } = useQueryFilters();

const queryValue = computed(
  () => (route.query[props.queryKey] as string) ?? ''
);

const localValue = ref<string | number>(queryValue.value);

const handleDebouncedValueChange = useDebounceFn(
  setFilter,
  DEFAULT_DEBOUNCE_TIME
);

const handleChange = (value: string | number) => {
  localValue.value = value;
  handleDebouncedValueChange(props.queryKey, String(value));
};

watch(
  () => queryValue.value,
  (newQueryValue) => {
    if (newQueryValue) return;
    localValue.value = '';
  }
);
</script>

<template>
  <Select
    v-if="props.type === QUERY_FILTER_TYPE.Select"
    v-bind="filterProps as ISelectProps"
    :model-value="localValue"
    @update:model-value="handleChange"
  />
  <Input
    v-else
    v-bind="filterProps as IInputProps"
    :model-value="localValue"
    @update:model-value="handleChange"
  />
</template>
