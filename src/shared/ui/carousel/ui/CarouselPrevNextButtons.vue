<script setup lang="ts">
import { computed } from 'vue';

import type { IButtonVariants } from '../../button';
import { useCarousel } from '../composables';

import { CarouselNext, CarouselPrevious } from './index';

const { canScrollPrev, canScrollNext } = useCarousel();

const isVisible = computed(() => canScrollPrev.value || canScrollNext.value);

withDefaults(defineProps<{ size?: IButtonVariants['size'] }>(), {
  size: 'icon-sm',
});
</script>

<template>
  <div v-if="isVisible" class="space-x-2">
    <CarouselPrevious :size="size" />
    <CarouselNext :size="size" />
  </div>
</template>
