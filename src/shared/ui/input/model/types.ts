import type { HTMLAttributes } from 'vue';

type IInputProps = {
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
  placeholder?: string;
};

export type { IInputProps };
