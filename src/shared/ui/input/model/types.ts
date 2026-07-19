import type { HTMLAttributes } from 'vue';

type IInputProps = {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
};

export type { IInputProps };
