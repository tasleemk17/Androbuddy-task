import { ChevronDown, MapPin, Search, ShoppingBag } from 'lucide-react';
import { cartCount, useCartStore } from '../store/cart';
import { Button } from './ui/button';
export function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const count = useCartStore((s) => cartCount(s.items));
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="logo" href="/" aria-label="Zepto home">
          zepto<span>.</span>
        </a>
        <div className="location">
          <div>
            <MapPin size={14} />
            <span>Delivery location</span>
          </div>
          <button
            onClick={() =>
              alert('Mock location: Bengaluru. Location selection is not connected in this demo.')
            }
            aria-label="Select delivery location (mock)"
          >
            Bengaluru, India <ChevronDown size={15} />
          </button>
        </div>
        <div className="mock-search">
          <Search size={19} />
          <span>Search for everyday favourites</span>
          <span className="search-tag">Demo</span>
        </div>
        <Button
          className="cart-button"
          onClick={onCartOpen}
          aria-label={`Open cart, ${count} items`}
        >
          <ShoppingBag size={20} />
          <span className="cart-label">My cart</span>
          <span className="cart-badge" data-testid="cart-count" aria-live="polite">
            {count}
          </span>
        </Button>
      </div>
    </header>
  );
}
