<script setup lang="ts">
import { computed } from 'vue';

import { useCarousel } from '../composables';

const { scrollSnaps, selectedSnap, scrollTo } = useCarousel();

const isVisible = computed(() => scrollSnaps.value.length > 1);
</script>

<template>
  <div v-if="isVisible" class="flex justify-center">
    <div class="flex gap-2">
      <div
        v-for="(_, index) in scrollSnaps"
        :key="index"
        :class="[
          'size-2 cursor-pointer rounded-full',
          selectedSnap === index ? 'bg-primary' : 'bg-muted',
        ]"
        @click="scrollTo(index)"
      />
    </div>
  </div>
</template>
