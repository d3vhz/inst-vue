<script lang="ts" setup>
import { ChevronRight } from '@lucide/vue';
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('mt-1 [&>svg]:size-3.5', props.class)"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
