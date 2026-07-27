<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';

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

const { canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="cn(props.class)"
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
