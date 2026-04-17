import { useState, useCallback, useRef } from 'react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import CategoryGrid from '../components/CategoryGrid';
import { getCategoryIcon } from '../components/CategoryGrid';
import { JEWELRY_CATEGORIES } from '../utils/constants';

// Horizontal scroll section component
const CategorySection = ({ category, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  const icon = getCategoryIcon(category);

  return (
    <section id={`category-${category}`} className="mb-10 pt-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent">
              {icon}
            </div>
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">{category}</h2>
          </div>
          <div className="w-12 h-[3px] bg-accent mt-3"></div>
          <p className="text-xs text-text-secondary mt-2 tracking-wide font-medium uppercase">{products.length} pieces available</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 bg-white border-2 border-border hover:border-accent hover:text-accent flex items-center justify-center text-text-muted transition-all rounded-sm"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-sm bg-white border border-border hover:border-accent hover:text-accent flex items-center justify-center text-text-muted transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

// Skeleton section for loading
const SectionSkeleton = () => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="skeleton w-10 h-10 rounded-sm" />
      <div>
        <div className="skeleton h-5 w-32 rounded mb-1" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="shrink-0 w-[280px] glass-card overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-3">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
            <div className="skeleton h-3 w-full rounded" />
            <div className="skeleton h-8 w-full rounded mt-3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const {
    getFilteredProducts,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    getProductsByCategory,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const products = getFilteredProducts();

  const isSearchMode = searchQuery.trim().length > 0;

  // Search submit
  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault();
      if (searchInput.trim().length >= 2) {
        setSearchQuery(searchInput);
      }
    },
    [searchInput, setSearchQuery]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchInput('');
  }, [setSearchQuery]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group products by category for homepage sections
  const categorySections = JEWELRY_CATEGORIES.map((category) => ({
    category,
    products: getProductsByCategory(category),
  })).filter((s) => s.products.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero section */}
      <div className="mb-10 text-center py-16 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-4">Curated with Love</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Discover Exquisite<br/>
          <span className="text-accent underline decoration-4 underline-offset-8">Jewelry</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium mt-8 uppercase tracking-widest">
          Handpicked jewelry from India's most trusted brands — for every occasion.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 bg-white border border-border p-6 shadow-[4px_4px_0_rgba(0,0,0,0.05)] rounded-none">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for rings, necklaces, earrings, gold, diamond..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-accent-secondary rounded-sm text-sm text-text-primary font-medium placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              id="search-input"
            />
          </div>
          <button
            type="submit"
            disabled={searchInput.trim().length < 2}
            className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 border-accent flex items-center gap-2 shrink-0"
          >
            Search
          </button>
        </form>

        {/* Info bar for search */}
        {isSearchMode && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <button
              onClick={handleClearSearch}
              className="text-xs text-accent hover:text-accent-light transition-colors font-bold uppercase tracking-wider"
            >
              ← Back to All Jewelry
            </button>
          </div>
        )}
      </div>

      {/* ========== SEARCH RESULTS MODE ========== */}
      {isSearchMode && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-text-secondary">
              Showing {products.length} piece{products.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-widest bg-white border-2 border-border border-b-4 border-b-accent rounded-sm hover:bg-surface-hover transition-all text-text-primary"
            >
              Filters
            </button>
          </div>

          <div className="flex gap-8">
            <div className="hidden lg:block shrink-0">
              <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="lg:hidden">
              <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-surface-card flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">No jewelry found</h3>
                  <p className="text-sm text-text-muted max-w-sm">Try a different search term or browse our collections below.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ========== BROWSE / HOMEPAGE MODE ========== */}
      {!isSearchMode && (
        <>
          {/* Category Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-accent-secondary">Shop by Collection</h2>
                <div className="w-16 h-[3px] bg-accent mt-2"></div>
              </div>
            </div>
            <CategoryGrid 
              onCategoryClick={(cat) => handleCategoryClick(cat)} 
              selectedCategory={selectedCategory} 
            />
          </div>

          {/* Category sections */}
          {categorySections.map(({ category, products: catProducts }) => (
            <CategorySection
              key={category}
              category={category}
              products={catProducts}
            />
          ))}

          {/* Empty state */}
          {categorySections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-2xl bg-surface-card flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                No products yet
              </h3>
              <p className="text-sm text-text-muted max-w-sm">
                Products will appear here once they are added to the catalog.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
