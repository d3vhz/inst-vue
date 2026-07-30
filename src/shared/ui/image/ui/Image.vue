<script setup lang="ts">
import { Primitive, useForwardExpose } from 'reka-ui';
import { toRefs, watch } from 'vue';

import { cn } from '~/shared/lib';

import { useImageLoadingStatus } from '../composables';
import type { IImageEmits, IImageProps } from '../model';

import { injectImageRootContext } from './ImageRoot.vue';

const props = withDefaults(defineProps<IImageProps>(), {
  as: 'img',
  referrerPolicy: '',
  crossOrigin: '',
});
const emits = defineEmits<IImageEmits>();

const { src, referrerPolicy, crossOrigin } = toRefs(props);
useForwardExpose();
const rootContext = injectImageRootContext();

const { imageLoadingStatus } = useImageLoadingStatus(src, {
  referrerPolicy,
  crossOrigin,
});

watch(
  imageLoadingStatus,
  (newValue) => {
    emits('loadingStatusChange', newValue);
    if (newValue !== 'idle') rootContext.imageLoadingStatus.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <Primitive
    v-show="imageLoadingStatus === 'loaded'"
    role="img"
    :as-child="asChild"
    :as="as"
    :src="src"
    :referrerpolicy="referrerPolicy"
    :crossorigin="crossOrigin"
    :class="cn('size-full', props.class)"
  >
    <slot />
  </Primitive>
</template>
