<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue';

import { cn } from '~/shared/lib';

import { Button, type IButtonVariants } from '../../button';
import { useCarousel } from '../composables';
import type { WithClassAsProps } from '../model';

const props = withDefaults(
  defineProps<
    {
      variant?: IButtonVariants['variant'];
      size?: IButtonVariants['size'];
    } & WithClassAsProps
  >(),
  {
    variant: 'secondary',
    size: 'icon',
  }
);

const { canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="cn(props.class)"
    :variant="variant"
    :size="size"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
