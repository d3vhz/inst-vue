import type { VariantProps } from 'class-variance-authority';

import type { IInputProps } from '../../input';
import type { ITextAreaProps } from '../../textarea/model';
import type { fieldVariants } from '../config';

type IFieldVariants = VariantProps<typeof fieldVariants>;

interface IInputFieldProps extends IInputProps {
  label: string;
  name: string;
  description?: string;
}

interface ITextareaFieldProps extends ITextAreaProps {
  label: string;
  name: string;
  description?: string;
  maxLength?: number;
}

export type { IFieldVariants, IInputFieldProps, ITextareaFieldProps };
