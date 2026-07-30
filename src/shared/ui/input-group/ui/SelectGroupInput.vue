<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

import { type ISelectProps, Select } from '../../select';

const props = defineProps<
  Omit<ISelectProps, 'selectTriggerProps'> & {
    class?: HTMLAttributes['class'];
  }
>();
</script>

<template>
  <Select
    data-slot="select-group-control"
    :select-trigger-props="{ class: 'border-0 focus-visible:ring-0' }"
    v-bind="props"
    :class="
      cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class
      )
    "
  />
</template>
