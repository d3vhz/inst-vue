import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';

interface IImageRootProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}

interface ImageFallbackProps extends PrimitiveProps {
  /** Useful for delaying rendering so it only appears for those with slower connections. */
  delayMs?: number;
  class?: HTMLAttributes['class'];
}

type IImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type IImageEmits = {
  /**
   * A callback providing information about the loading status of the image. <br>
   * This is useful in case you want to control more precisely what to render as the image is loading.
   */
  loadingStatusChange: [value: IImageLoadingStatus];
};

interface IImageProps extends PrimitiveProps {
  src: string;
  referrerPolicy?: ImgHTMLAttributes['referrerpolicy'];
  crossOrigin?: ImgHTMLAttributes['crossorigin'];
  class?: HTMLAttributes['class'];
}

export type {
  IImageRootProps,
  ImageFallbackProps,
  IImageProps,
  IImageEmits,
  IImageLoadingStatus,
};
