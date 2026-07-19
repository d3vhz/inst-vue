<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '~/shared/lib';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="cn('my-0 ml-0 flex w-full min-w-0 flex-col gap-1', props.class)"
  >
    <slot />
  </ul>
</template>
