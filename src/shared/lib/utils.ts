import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const parseError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error) || 'An unknown error occurred';
};

export { cn, parseError };
