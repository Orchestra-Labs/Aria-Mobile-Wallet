import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export { cva, type VariantProps } from 'class-variance-authority';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs, { strict: false }));
};
