import { isClient } from '@vueuse/shared';
import {
  computed,
  type ImgHTMLAttributes,
  onMounted,
  onUnmounted,
  ref,
  type Ref,
  watchEffect,
} from 'vue';

import type { IImageLoadingStatus } from '../model';
import { resolveLoadingStatus } from '../utils';

export function useImageLoadingStatus(
  src: Ref<string>,
  {
    referrerPolicy,
    crossOrigin,
  }: {
    referrerPolicy?: Ref<ImgHTMLAttributes['referrerpolicy']>;
    crossOrigin?: Ref<ImgHTMLAttributes['crossorigin']>;
  } = {}
) {
  const isMounted = ref(false);
  const imageRef = ref<HTMLImageElement | null>(null);
  const image = computed(() => {
    if (!isMounted.value) {
      return null;
    }
    if (!imageRef.value && isClient) {
      imageRef.value = new window.Image();
    }
    return imageRef.value;
  });

  const loadingStatus = ref<IImageLoadingStatus>(
    resolveLoadingStatus(image.value, src.value)
  );

  const updateStatus = (status: IImageLoadingStatus) => () => {
    if (isMounted.value) loadingStatus.value = status;
  };

  onMounted(() => {
    isMounted.value = true;

    watchEffect((onCleanup) => {
      const img = image.value;
      if (!img) return;

      loadingStatus.value = resolveLoadingStatus(img, src.value);

      const handleLoad = updateStatus('loaded');
      const handleError = updateStatus('error');

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);

      if (referrerPolicy?.value) img.referrerPolicy = referrerPolicy.value;
      if (typeof crossOrigin?.value === 'string')
        img.crossOrigin = crossOrigin.value;

      onCleanup(() => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      });
    });
  });

  onUnmounted(() => {
    isMounted.value = false;
  });

  return {
    imageLoadingStatus: loadingStatus,
  };
}
