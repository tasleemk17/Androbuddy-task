import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cart';
import type { Product } from '../types/product';
export function QuantityControl({ product, quantity }: { product: Product; quantity: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const decrement = useCartStore((s) => s.decrement);
  return (
    <div className="quantity-control" aria-label={`Quantity for ${product.title}`}>
      <button aria-label={`Decrease ${product.title}`} onClick={() => decrement(product.id)}>
        <Minus size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button aria-label={`Increase ${product.title}`} onClick={() => addItem(product)}>
        <Plus size={16} />
      </button>
    </div>
  );
}
