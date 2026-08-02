import type { InputHTMLAttributes } from 'vue';

type IInputBaseProps = Pick<
  InputHTMLAttributes,
  'class' | 'placeholder' | 'disabled'
>;

type IInputProps = IInputBaseProps & {
  defaultValue?: string | number;
  modelValue?: string | number;
};

export type { IInputProps };
