import { z } from 'zod';

const urlSchema = z.string().url();

export { urlSchema };
