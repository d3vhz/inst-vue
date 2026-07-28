import type { InputHTMLAttributes } from 'vue';

type IFileUploadProps = Pick<
  InputHTMLAttributes,
  'disabled' | 'multiple' | 'accept'
>;

export type { IFileUploadProps };
