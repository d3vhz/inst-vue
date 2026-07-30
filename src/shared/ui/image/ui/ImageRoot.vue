<script lang="ts">
import { createContext, Primitive, useForwardExpose } from 'reka-ui';
import type { Ref } from 'vue';

import { cn } from '~/shared/lib';

import type { IImageLoadingStatus, IImageRootProps } from '../model';

export type ImageRootContext = {
  imageLoadingStatus: Ref<IImageLoadingStatus>;
};

export const [injectImageRootContext, provideImageRootContext] =
  createContext<ImageRootContext>('ImageRoot');
</script>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<IImageRootProps>(), {
  as: 'span',
});

useForwardExpose();

provideImageRootContext({
  imageLoadingStatus: ref<IImageLoadingStatus>('idle'),
});
</script>

<template>
  <Primitive
    :as-child="asChild"
    :as="as"
    :class="cn('relative size-full object-cover', props.class)"
  >
    <slot />
  </Primitive>
</template>
