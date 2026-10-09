import { useState } from 'react';
import { ArrowRight, Zap, Package, RefreshCw } from 'lucide-react';
import { useCatalog } from './hooks/useCatalog';
import { categoryLabel } from './lib/utils';
import { Header } from './components/Header';
import { CartSheet } from './components/CartSheet';
import { ProductCard } from './components/ProductCard';
import { Button } from './components/ui/button';
export default function App() {
  const [category, setCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const { products, categories } = useCatalog();
  const catalog = products.data ?? [];
  const visibleProducts =
    category === 'all' ? catalog : catalog.filter((p) => p.category === category);
  const chooseCategory = (value: string) => {
    setCategory(value);
  };
  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} />
      <nav className="category-nav" aria-label="Product categories">
        <div className="page-width tab-list">
          <button
            className={category === 'all' ? 'active' : ''}
            onClick={() => chooseCategory('all')}
            aria-pressed={category === 'all'}
          >
            <Zap size={16} /> All essentials
          </button>
          {categories.data?.map((c) => (
            <button
              key={c}
              onClick={() => chooseCategory(c)}
              className={category === c ? 'active' : ''}
              aria-pressed={category === c}
            >
              {categoryLabel(c)}
            </button>
          ))}
        </div>
      </nav>
      <main className="page-width">
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-kicker">
              <Zap size={13} fill="currentColor" /> EVERYDAY, MADE EASY
            </span>
            <h1>
              Little things.
              <br />
              <span>Big everyday energy.</span>
            </h1>
            <p>
              Your favourites, a tap away. Find your next
              <br className="desktop-break" /> everyday essential right here.
            </p>
            <Button
              className="hero-button"
              onClick={() =>
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore essentials <ArrowRight size={17} />
            </Button>
            <small>Zepto-inspired shopping demo · Powered by FakeStore</small>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun-orbit" />
            <div className="shopping-bag bag-purple">
              <div className="bag-handle" />
              <span>
                little
                <br />
                joys.
              </span>
            </div>
            <div className="shopping-bag bag-yellow">
              <div className="bag-handle" />
              <Zap size={58} strokeWidth={1.5} />
            </div>
            <span className="art-sticker">
              GOOD FINDS
              <br />
              GREAT DAYS
            </span>
            <span className="art-spark spark-one">✦</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </section>
        <section className="category-section">
          <div className="section-heading">
            <div>
              <h2>Shop by category</h2>
              <p>A little bit of everything you love.</p>
            </div>
            <span className="muted-label">Pick your mood</span>
          </div>
          {categories.isError ? (
            <div className="inline-error">
              Could not load categories.{' '}
              <button onClick={() => categories.refetch()}>Retry categories</button>
            </div>
          ) : (
            <div className="category-cards">
              {categories.isPending
                ? Array.from({ length: 4 }, (_, i) => (
                    <div className="category-skeleton skeleton" key={i} />
                  ))
                : categories.data?.map((c, i) => {
                    const representative = catalog.find((p) => p.category === c);
                    return (
                      <button
                        className={`category-tile tile-${i} ${category === c ? 'selected' : ''}`}
                        key={c}
                        onClick={() => chooseCategory(c)}
                        aria-pressed={category === c}
                        aria-label={`Shop ${categoryLabel(c)}`}
                      >
                        <div>
                          {representative ? (
                            <img src={representative.image} alt="" />
                          ) : (
                            <Package size={32} />
                          )}
                        </div>
                        <span>{categoryLabel(c)}</span>
                        <ArrowRight size={16} />
                      </button>
                    );
                  })}
            </div>
          )}
        </section>
        <section id="products" className="products-section">
          <div className="section-heading">
            <div>
              <h2>{category === 'all' ? 'Your next favourite' : categoryLabel(category)}</h2>
              <p>
                {products.isSuccess
                  ? `${visibleProducts.length} finds, ready for your cart`
                  : 'Everyday essentials, handpicked for you'}
              </p>
            </div>
            {category !== 'all' && (
              <Button variant="ghost" size="sm" onClick={() => chooseCategory('all')}>
                View all
              </Button>
            )}
          </div>
          {products.isPending ? (
            <div className="product-grid" aria-label="Loading products">
              {Array.from({ length: 8 }, (_, i) => (
                <div className="product-skeleton skeleton" key={i} />
              ))}
            </div>
          ) : products.isError ? (
            <div className="error-state" role="alert">
              <Package size={32} />
              <h3>We couldn't load the store</h3>
              <p>{products.error.message}</p>
              <Button onClick={() => products.refetch()}>
                <RefreshCw size={16} /> Try again
              </Button>
            </div>
          ) : visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="error-state">
              <h3>No products in this category</h3>
              <Button onClick={() => chooseCategory('all')}>See all products</Button>
            </div>
          )}
        </section>
        <footer className="site-footer">
          <span className="logo footer-logo">
            zepto<span>.</span>
          </span>
          <p>Built for the little things that make your day.</p>
          <small>
            Educational clone · Not affiliated with Zepto · Prices in USD from FakeStore API
          </small>
        </footer>
      </main>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
