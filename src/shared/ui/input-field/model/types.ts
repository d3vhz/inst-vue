import type { IInputProps } from '../../input';

interface IInputFieldProps extends IInputProps {
  label: string;
  name: string;
  description?: string;
}

export type { IInputFieldProps };
