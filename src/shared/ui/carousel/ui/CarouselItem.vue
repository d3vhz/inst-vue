<script setup lang="ts">
import { cn } from '~/shared/lib';

import { useCarousel } from '../composables';
import type { WithClassAsProps } from '../model';

const props = defineProps<WithClassAsProps>();

const { orientation } = useCarousel();
</script>

<template>
  <div
    data-slot="carousel-item"
    role="group"
    aria-roledescription="slide"
    :class="
      cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-2' : 'pt-2',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
