import type { Product } from '../types/product';
const API_BASE = 'https://fakestoreapi.com';
async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { signal });
  if (!response.ok) throw new Error(`Store request failed (${response.status}). Please try again.`);
  return response.json() as Promise<T>;
}
export const fetchProducts = (signal?: AbortSignal) => get<Product[]>('/products', signal);
export const fetchCategories = (signal?: AbortSignal) =>
  get<string[]>('/products/categories', signal);
