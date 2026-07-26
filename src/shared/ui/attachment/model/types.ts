import type { VariantProps } from 'class-variance-authority';

import type { attachmentMediaVariants, attachmentVariants } from '../config';

type AttachmentVariants = VariantProps<typeof attachmentVariants>;
type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>;

export type { AttachmentVariants, AttachmentMediaVariants };
