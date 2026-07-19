import type { HTMLAttributes } from 'vue';

type ITextAreaProps = {
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
};

export type { ITextAreaProps };
