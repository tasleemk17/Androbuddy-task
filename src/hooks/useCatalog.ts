import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '../lib/api';
export function useCatalog() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => fetchProducts(signal),
    staleTime: 5 * 60 * 1000,
  });
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => fetchCategories(signal),
    staleTime: 30 * 60 * 1000,
  });
  return { products, categories };
}
