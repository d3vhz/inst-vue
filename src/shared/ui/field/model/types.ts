import type { VariantProps } from 'class-variance-authority';

import type { IInputProps } from '../../input';
import type { ISelectProps } from '../../select';
import type { ITextAreaProps } from '../../textarea/model';
import type { fieldVariants } from '../config';

type IFieldVariants = VariantProps<typeof fieldVariants>;

interface IFieldBaseProps {
  label: string;
  name: string;
  description?: string;
}

interface IFieldWrapProps extends IFieldBaseProps {
  errorMessage?: string;
}

type IInputFieldProps = IInputProps & IFieldBaseProps;

interface ITextareaFieldProps extends ITextAreaProps, IFieldBaseProps {
  maxLength?: number;
}

interface ISelectFieldProps extends ISelectProps, IFieldBaseProps {}

export type {
  IFieldWrapProps,
  IFieldBaseProps,
  IFieldVariants,
  IInputFieldProps,
  ITextareaFieldProps,
  ISelectFieldProps,
};
