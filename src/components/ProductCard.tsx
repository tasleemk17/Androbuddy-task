import { Star } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../types/product';
import { useCartStore } from '../store/cart';
import { formatPrice, categoryLabel } from '../lib/utils';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { QuantityControl } from './QuantityControl';
export function ProductCard({ product }: { product: Product }) {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.product.id === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  return (
    <Card className="product-card" data-testid="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="rating">
          <Star size={11} fill="currentColor" />
          {product.rating.rate}
        </span>
      </div>
      <div className="product-info">
        <p className="eyebrow">{categoryLabel(product.category)}</p>
        <h3 title={product.title}>{product.title}</h3>
        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          {quantity ? (
            <QuantityControl product={product} quantity={quantity} />
          ) : (
            <Button
              variant="outline"
              className="add-button"
              aria-label={`Add ${product.title}`}
              onClick={() => {
                addItem(product);
                toast.success('Added to your cart');
              }}
            >
              ADD
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
