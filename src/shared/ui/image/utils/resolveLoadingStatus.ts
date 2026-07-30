import type { IImageLoadingStatus } from '../model';

const resolveLoadingStatus = (
  image: HTMLImageElement | null,
  src?: string
): IImageLoadingStatus => {
  if (!image) {
    return 'idle';
  }
  if (!src) {
    return 'error';
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? 'loaded' : 'loading';
};

export { resolveLoadingStatus };
