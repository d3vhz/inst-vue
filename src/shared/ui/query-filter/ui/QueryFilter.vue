<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { DEFAULT_DEBOUNCE_TIME } from '~/shared/config';

import {
  InputGroup,
  InputGroupInput,
  SelectGroupInput,
} from '../../input-group';
import { useQueryFilters } from '../composables';
import { QUERY_FILTER_TYPE } from '../config';
import type { IQueryFilterProps } from '../model';

import ClearIcon from './ClearIcon.vue';

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
  () => queryValue,
  (newQueryValue) => {
    if (newQueryValue) return;
    localValue.value = '';
  }
);
</script>

<template>
  <InputGroup v-if="type === QUERY_FILTER_TYPE.Select" class="rounded-full">
    <SelectGroupInput
      v-bind="filterProps"
      :model-value="localValue"
      @update:model-value="handleChange"
    />
    <ClearIcon v-show="Boolean(localValue)" @clear="handleChange('')" />
  </InputGroup>
  <InputGroup v-else class="rounded-full">
    <InputGroupInput
      v-bind="filterProps"
      :model-value="localValue"
      @update:model-value="handleChange"
    />
    <ClearIcon v-show="Boolean(localValue)" @clear="handleChange('')" />
  </InputGroup>
</template>
