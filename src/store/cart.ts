import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types/product';
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  decrement: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set(({ items }) => ({
          items: items.some((item) => item.product.id === product.id)
            ? items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [...items, { product, quantity: 1 }],
        })),
      decrement: (id) =>
        set(({ items }) => ({
          items: items
            .map((item) =>
              item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (id) =>
        set(({ items }) => ({ items: items.filter((item) => item.product.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'zepto-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ items }) => ({ items }),
    },
  ),
);
export const cartCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);
// Calculate in cents to avoid floating-point price errors.
export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + Math.round(item.product.price * 100) * item.quantity, 0) / 100;
