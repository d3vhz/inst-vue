<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import type { RouterLinkProps } from 'vue-router';

import { cn } from '~/shared/lib';

const props = withDefaults(
  defineProps<RouterLinkProps & { class?: HTMLAttributes['class'] }>(),
  {
    class: '',
  }
);
</script>

<template>
  <RouterLink
    data-slot="breadcrumb-link"
    v-bind="props"
    :class="
      cn(
        'hover:text-foreground text-primary max-w-40 truncate transition-colors lg:max-w-fit',
        props.class
      )
    "
  >
    <slot />
  </RouterLink>
</template>
