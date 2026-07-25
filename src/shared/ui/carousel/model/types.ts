import type useEmblaCarousel from 'embla-carousel-vue';
import type { EmblaCarouselVueType } from 'embla-carousel-vue';
import type { HTMLAttributes, UnwrapRef } from 'vue';

type CarouselApi = EmblaCarouselVueType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type UnwrapRefCarouselApi = UnwrapRef<CarouselApi>;

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
}

interface CarouselEmits {
  (e: 'init-api', payload: UnwrapRefCarouselApi): void;
}

interface WithClassAsProps {
  class?: HTMLAttributes['class'];
}

export type {
  UnwrapRefCarouselApi,
  CarouselProps,
  CarouselEmits,
  WithClassAsProps,
};
