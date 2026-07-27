import type { InputHTMLAttributes } from 'vue';

type IInputBaseProps = Pick<
  InputHTMLAttributes,
  'value' | 'placeholder' | 'class' | 'disabled' | 'readonly' | 'maxlength'
>;

type IInputProps = IInputBaseProps & {
  defaultValue?: string | number;
  modelValue?: string | number;
};

export type { IInputProps };
