import { z } from 'zod';

const FileItemSchema = z.object({
  name: z.string(),
  size: z.number().nonnegative('Размер должен быть неотрицательным числом'),
  type: z.string(),
  uri: z.string().url('Некорректный URI'),
  file: z.instanceof(File, { message: 'Должен быть объект File' }),
});

export { FileItemSchema };
