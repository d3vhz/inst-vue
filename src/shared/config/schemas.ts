import { z } from 'zod';

const BlobUrlSchema = z.string().url('Must be a valid URL');

const UrlSchema = z.string().url('Must be a valid URL');

export { UrlSchema, BlobUrlSchema };
