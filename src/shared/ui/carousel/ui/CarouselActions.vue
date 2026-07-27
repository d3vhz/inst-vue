<script setup lang="ts">
import { computed } from 'vue';

import type { IButtonVariants } from '../../button';
import { useCarousel } from '../composables';

import { CarouselNext, CarouselPrevious } from './index';

const { canScrollPrev, canScrollNext } = useCarousel();

const isActionsVisible = computed(
  () => canScrollPrev.value || canScrollNext.value
);

defineProps<{ size?: IButtonVariants['size'] }>();
</script>

<template>
  <div v-show="isActionsVisible" class="space-x-2">
    <CarouselPrevious :size="size" />
    <CarouselNext :size="size" />
  </div>
</template>
