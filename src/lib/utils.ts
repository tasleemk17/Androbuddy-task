import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
export const categoryLabel = (category: string) =>
  ({
    electronics: 'Electronics',
    jewelery: 'Jewellery',
    "men's clothing": 'For him',
    "women's clothing": 'For her',
  })[category] ?? category;
