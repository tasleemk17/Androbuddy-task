import { ShoppingBag, Trash2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore, cartCount, cartSubtotal } from '../store/cart';
import { formatPrice } from '../lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { QuantityControl } from './QuantityControl';
export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = cartSubtotal(items);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <header className="cart-header">
          <SheetTitle className="text-xl font-bold">
            My cart <span className="cart-title-count">{cartCount(items)}</span>
          </SheetTitle>
          <SheetDescription className="mt-1 text-sm text-gray-500">
            Your everyday favourites, all in one place.
          </SheetDescription>
        </header>
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              <ShoppingBag size={36} />
            </div>
            <h3>Your cart is waiting</h3>
            <p>Find something you love and tap ADD.</p>
            <Button onClick={() => onOpenChange(false)}>Start exploring</Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article key={product.id} className="cart-item" data-testid="cart-item">
                  <img src={product.image} alt={product.title} />
                  <div className="cart-item-info">
                    <h3>{product.title}</h3>
                    <p>{formatPrice(product.price)} each</p>
                    <div className="cart-item-actions">
                      <QuantityControl product={product} quantity={quantity} />
                      <button
                        className="remove-button"
                        aria-label={`Remove ${product.title}`}
                        onClick={() => {
                          removeItem(product.id);
                          toast('Item removed');
                        }}
                      >
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                    <strong className="line-total">{formatPrice(product.price * quantity)}</strong>
                  </div>
                </article>
              ))}
            </div>
            <footer className="cart-summary">
              <h3>Bill summary</h3>
              <div>
                <span>Subtotal ({cartCount(items)} items)</span>
                <strong data-testid="subtotal">{formatPrice(total)}</strong>
              </div>
              <p className="demo-note">
                <ShieldCheck size={17} /> Demo cart only. No payment or delivery.
              </p>
              <Button className="w-full" variant="outline" onClick={() => onOpenChange(false)}>
                Continue shopping
              </Button>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
