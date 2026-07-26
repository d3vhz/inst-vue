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
  errorMessage?: string;
}

interface IInputFieldProps extends IInputProps, IFieldBaseProps {}

interface ITextareaFieldProps extends ITextAreaProps, IFieldBaseProps {
  maxLength?: number;
}

interface ISelectFieldProps extends ISelectProps, IFieldBaseProps {}

export type {
  IFieldBaseProps,
  IFieldVariants,
  IInputFieldProps,
  ITextareaFieldProps,
  ISelectFieldProps,
};
