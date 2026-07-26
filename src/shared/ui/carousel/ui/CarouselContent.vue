<script setup lang="ts">
import { cn } from '~/shared/lib';

import { useCarousel } from '../composables';
import type { WithClassAsProps } from '../model';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<WithClassAsProps>();

// @ts-expect-error - carouselRef, используется в шаблоне как ref
const { carouselRef, orientation } = useCarousel();
</script>

<template>
  <div ref="carouselRef" data-slot="carousel-content" class="overflow-hidden">
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
