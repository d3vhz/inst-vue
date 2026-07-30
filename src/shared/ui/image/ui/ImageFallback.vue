<script lang="ts">
import { isClient } from '@vueuse/shared';
import { Primitive, useForwardExpose } from 'reka-ui';

import { cn } from '~/shared/lib';

import type { ImageFallbackProps } from '../model';
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { injectImageRootContext } from './ImageRoot.vue';

const props = withDefaults(defineProps<ImageFallbackProps>(), {
  as: 'span',
  delayMs: 100,
});

const rootContext = injectImageRootContext();
useForwardExpose();

const canRender = ref(props.delayMs === undefined);

watchEffect((onCleanup) => {
  if (props.delayMs && isClient) {
    const timerId = window.setTimeout(() => {
      canRender.value = true;
    }, props.delayMs);

    onCleanup(() => {
      window.clearTimeout(timerId);
    });
  }
});
</script>

<template>
  <Primitive
    v-if="canRender && rootContext.imageLoadingStatus.value !== 'loaded'"
    :as-child="asChild"
    :as="as"
    :class="
      cn('bg-muted flex size-full items-center justify-center', props.class)
    "
  >
    <slot />
  </Primitive>
</template>
