import { z } from 'zod';

const BlobUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .min(1, 'URL cannot be empty');

export { BlobUrlSchema };
