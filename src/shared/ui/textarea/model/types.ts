import type { HTMLAttributes, TextareaHTMLAttributes } from 'vue';

type ITextareaBaseProps = Pick<TextareaHTMLAttributes, 'rows'>;

type ITextAreaProps = ITextareaBaseProps & {
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
};

export type { ITextAreaProps };
