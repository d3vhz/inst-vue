import type { HTMLAttributes } from 'vue';

type TextAreaProps = {
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
};

export type { TextAreaProps };
