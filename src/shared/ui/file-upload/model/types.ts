import type { InputHTMLAttributes } from 'vue';
import { z } from 'zod';

import type { FileItemSchema } from '../config';

type IFileItem = z.infer<typeof FileItemSchema>;

type IFileUploadProps = Pick<
  InputHTMLAttributes,
  'disabled' | 'multiple' | 'accept'
>;

export type { IFileUploadProps, IFileItem };
