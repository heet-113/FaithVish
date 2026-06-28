import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MenProductCard from '../components/MenProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { JEWELRY_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS, formatPrice } from '../utils/constants';

// Category image map for editorial cards
const WOMEN_CATEGORY_IMAGES = {
  Rings: 'https://images.pexels.com/photos/17593587/pexels-photo-17593587.jpeg',
  Necklaces: 'https://images.pexels.com/photos/23495720/pexels-photo-23495720.jpeg',
  Earrings: 'https://images.pexels.com/photos/7541804/pexels-photo-7541804.jpeg',
  Bracelets: 'https://images.pexels.com/photos/16055236/pexels-photo-16055236.jpeg',
  Bangles: 'https://images.pexels.com/photos/37485307/pexels-photo-37485307.jpeg',
  Pendants: 'https://images.pexels.com/photos/32382447/pexels-photo-32382447.jpeg',
  Anklets: 'https://images.pexels.com/photos/28573578/pexels-photo-28573578.jpeg',
  Mangalsutra: 'https://images.pexels.com/photos/7541802/pexels-photo-7541802.jpeg',
  'Jewelry Sets': 'https://images.pexels.com/photos/7093174/pexels-photo-7093174.jpeg',
};

const MEN_CATEGORY_IMAGES = {
  Rings: 'https://images.pexels.com/photos/20157679/pexels-photo-20157679.jpeg',
  Necklaces: 'https://images.pexels.com/photos/16109292/pexels-photo-16109292.jpeg',
  Bracelets: 'https://images.pexels.com/photos/15325460/pexels-photo-15325460.jpeg',
  Pendants: 'https://images.pexels.com/photos/15947180/pexels-photo-15947180.jpeg',
};

const CategoriesPage = () => {
  const {
    products,
    activeGender,
    getFilteredProducts,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  } = useStore();
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();
  const isMen = activeGender === 'men';
  const categories = isMen ? MEN_CATEGORIES : JEWELRY_CATEGORIES;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchSectionRef = useRef(null);

  // Decode the URL category param
  const selectedCategory = urlCategory ? decodeURIComponent(urlCategory) : null;

  // Men's palette
  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    accent: '#C9A96E',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  // ── Sync URL category → store selectedCategory so getFilteredProducts() works ──
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
    return () => {
      // Reset filters when leaving this page so homepage isn't pre-filtered
      resetFilters();
    };
    // Only depend on selectedCategory changes to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Sync search input from store
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Scroll to search results when searching
  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0 && searchSectionRef.current) {
      const timer = setTimeout(() => {
        searchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // ── Search handlers ──
  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault();
      if (searchInput.trim().length >= 1) {
        setSearchQuery(searchInput.trim());
      }
    },
    [searchInput, setSearchQuery]
  );

  const handleInputChange = useCallback(
    (e) => {
      const val = e.target.value;
      setSearchInput(val);
      if (val.trim() === '') {
        setSearchQuery('');
      }
    },
    [setSearchQuery]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchInput('');
  }, [setSearchQuery]);

  // ── Get filtered products from store (now correctly uses sort/price/search) ──
  const filteredProducts = selectedCategory ? getFilteredProducts() : [];
  const isSearchMode = searchQuery.trim().length > 0;

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter(
      (p) => p.category === category && p.gender === activeGender
    );
    const prices = categoryProducts.map((p) => p.price);
    return {
      count: categoryProducts.length,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    };
  };

  const categoryImages = isMen ? MEN_CATEGORY_IMAGES : WOMEN_CATEGORY_IMAGES;

  // ── Single Category View (when URL has /categories/:category) ───────────
  if (selectedCategory) {
    const displayLabel = isMen ? (MEN_CATEGORY_LABELS[selectedCategory] || selectedCategory) : selectedCategory;
    // Total unfiltered count for this category
    const totalCount = products.filter(
      (p) => p.category === selectedCategory && p.gender === activeGender
    ).length;

    return (
      <div
        className="min-h-screen"
        style={{ background: isMen ? m.bg : 'var(--color-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <Link
              to="/"
              className="transition-colors"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = isMen ? m.accent : 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = isMen ? m.textMuted : 'var(--color-text-muted)'}
            >
              Home
            </Link>
            <span style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>/</span>
            <Link
              to="/categories"
              className="transition-colors"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = isMen ? m.accent : 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = isMen ? m.textMuted : 'var(--color-text-muted)'}
            >
              Collections
            </Link>
            <span style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>/</span>
            <span
              className="font-medium"
              style={{ color: isMen ? m.accent : 'var(--color-accent)' }}
            >
              {displayLabel}
            </span>
          </nav>

          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1
              className="text-3xl sm:text-4xl font-display font-medium mb-2"
              style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
            >
              {displayLabel}
            </h1>
            <div
              className="w-12 h-0.5 mb-3"
              style={{ background: isMen ? m.accent : 'var(--color-accent)' }}
            />
            <p
              className="text-sm"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
            >
              {totalCount} piece{totalCount !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Search Bar */}
          <section ref={searchSectionRef} className="max-w-2xl mb-8 sm:mb-10">
            <form onSubmit={handleSearch} className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder={`Search in ${displayLabel.toLowerCase()}...`}
                className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm focus:outline-none transition-all"
                style={{
                  background: isMen ? '#282828' : '#FFFBF7',
                  border: `1px solid ${isMen ? '#3A3A3C' : 'var(--color-border)'}`,
                  color: isMen ? '#F5F5F0' : 'var(--color-text-primary)',
                }}
                onFocus={e => {
                  e.target.style.borderColor = isMen ? '#C9A96E' : 'var(--color-accent)';
                  if (!isMen) e.target.style.boxShadow = '0 0 0 3px rgba(184,92,106,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = isMen ? '#3A3A3C' : 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
                id="category-search-input"
              />
              {searchInput.trim().length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors"
                  style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>
            {isSearchMode && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
                <p className="text-sm" style={{ color: isMen ? '#9A9A9A' : 'var(--color-text-secondary)' }}>
                  <span className="font-semibold" style={{ color: isMen ? '#F5F5F0' : 'var(--color-text-primary)' }}>{filteredProducts.length}</span> result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                <button onClick={handleClearSearch} className="text-xs font-medium transition-colors" style={{ color: isMen ? '#C9A96E' : 'var(--color-accent)' }}>
                  ← Clear search
                </button>
              </div>
            )}
          </section>

          {/* Products + Filters */}
          <div className="flex lg:gap-8">
            {/* Filter sidebar */}
            <div className="hidden lg:block shrink-0">
              <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="lg:hidden">
              <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Products grid */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter button + result count bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
                  Showing {filteredProducts.length} of {totalCount} piece{totalCount !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-full transition-all"
                  style={{
                    background: isMen ? '#282828' : '#FFFBF7',
                    border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                    color: isMen ? m.textPrimary : 'var(--color-text-primary)',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters & Sort
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                {filteredProducts.map((product, index) => {
                  const isLarge = index % 3 === 0;
                  return (
                    <div key={product.id} className={isLarge ? 'col-span-2' : 'col-span-1'}>
                      {isMen
                        ? <MenProductCard product={product} isLarge={isLarge} />
                        : <ProductCard product={product} isLarge={isLarge} />
                      }
                    </div>
                  );
                })}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: isMen ? 'rgba(201,169,110,0.08)' : 'rgba(184,92,106,0.06)',
                      border: `1px solid ${isMen ? 'rgba(201,169,110,0.15)' : 'rgba(184,92,106,0.12)'}`,
                    }}
                  >
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>
                    {isSearchMode ? 'No results found' : `No ${displayLabel.toLowerCase()} found`}
                  </p>
                  <p className="text-xs mb-4" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                    {isSearchMode
                      ? 'Try adjusting your search or filters.'
                      : 'Check back soon for new additions!'}
                  </p>
                  {isSearchMode && (
                    <button
                      onClick={handleClearSearch}
                      className="px-5 py-2 text-xs font-medium rounded-full transition-all"
                      style={{
                        background: isMen ? m.card : '#FFFBF7',
                        border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                        color: isMen ? m.accent : 'var(--color-accent)',
                      }}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Back to collections */}
          <div className="text-center mt-12 mb-4">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-xs font-medium transition-colors"
              style={{ color: isMen ? m.accent : 'var(--color-accent)' }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Category Overview (when URL is just /categories) ───────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="text-center mb-12">

        <h1
          className="text-3xl sm:text-4xl font-display font-medium mb-3"
          style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
        >
          {isMen ? "Men's Collections" : 'Our Collections'}
        </h1>
        <div
          className="w-12 h-0.5 mx-auto"
          style={{ background: isMen ? m.accent : 'var(--color-accent)', opacity: 0.5 }}
        />
      </div>

      {/* Editorial Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 stagger-children">
        {categories.map((category) => {
          const stats = getCategoryStats(category);
          const displayLabel = isMen ? (MEN_CATEGORY_LABELS[category] || category) : category;
          const image = categoryImages[category];

          return (
            <Link
              key={category}
              to={`/categories/${encodeURIComponent(category)}`}
              className={`category-editorial-card ${isMen ? 'men-variant' : ''}`}
              style={{ aspectRatio: '3 / 4' }}
              id={`collection-${category}`}
            >
              <img
                src={image}
                alt={displayLabel}
                className="cat-card-image"
                loading="lazy"
              />
              <div className="cat-card-overlay">
                <span className="cat-card-label">{displayLabel}</span>
                <span className="cat-card-count">
                  {stats.count} piece{stats.count !== 1 ? 's' : ''}
                  {stats.minPrice > 0 && ` · From ${formatPrice(stats.minPrice)}`}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Browse all */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full transition-all"
          style={{
            background: isMen ? m.accent : 'var(--color-accent)',
            color: isMen ? m.bg : '#FFFBF7',
          }}
        >
          Back to Home
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
