import { beforeEach, describe, expect, it } from 'vitest';
import { cartCount, cartSubtotal, useCartStore } from './cart';
import type { Product } from '../types/product';
const product: Product = {
  id: 1,
  title: 'Test item',
  price: 10.1,
  category: 'test',
  description: '',
  image: '',
  rating: { rate: 4, count: 1 },
};
beforeEach(() => useCartStore.setState({ items: [] }));
describe('cart', () => {
  it('adds and increments without duplicate rows', () => {
    const s = useCartStore.getState();
    s.addItem(product);
    s.addItem(product);
    expect(useCartStore.getState().items).toEqual([{ product, quantity: 2 }]);
  });
  it('decrements and removes at zero', () => {
    const s = useCartStore.getState();
    s.addItem(product);
    s.addItem(product);
    s.decrement(1);
    expect(cartCount(useCartStore.getState().items)).toBe(1);
    s.decrement(1);
    expect(useCartStore.getState().items).toEqual([]);
  });
  it('removes only the selected item', () => {
    const s = useCartStore.getState();
    s.addItem(product);
    s.addItem({ ...product, id: 2 });
    s.removeItem(1);
    expect(useCartStore.getState().items[0].product.id).toBe(2);
  });
  it('calculates quantity count and cent-accurate subtotal', () => {
    const items = [{ product, quantity: 3 }];
    expect(cartCount(items)).toBe(3);
    expect(cartSubtotal(items)).toBe(30.3);
  });
});
