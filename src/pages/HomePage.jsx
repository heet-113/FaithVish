import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MenProductCard from '../components/MenProductCard';
import FilterSidebar from '../components/FilterSidebar';
import CategoryGrid from '../components/CategoryGrid';
import MenCategoryGrid from '../components/MenCategoryGrid';
import { getFeaturedPosts } from '../data/blog/index.js';

const WOMEN_PICKS = ['rings-18', 'necklaces-18', 'earrings-13', 'pendants-17'];
const MEN_PICKS = ['rings-15', 'necklaces-8', 'bracelets-14', 'pendants-16'];

const MIN_MEN_PICKS = ['rings-19', 'pendants-8', 'bracelets-22', 'necklaces-11'];
const MIN_WOMEN_PICKS = ['earrings-7', 'bracelets-10', 'bangles-8', 'pendants-14'];

// ─── Main HomePage ───────────────────────────────────────────────────────────
const HomePage = () => {
  const {
    getFilteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getProductsByCategory,
    getProductById,
    activeGender,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const products = getFilteredProducts();
  const searchSectionRef = useRef(null);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0 && searchSectionRef.current) {
      const timer = setTimeout(() => {
        searchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const isMen = activeGender === 'men';
  const isSearchMode = searchQuery.trim().length > 0;

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

  // Resolve picks
  const picksIds = isMen ? MEN_PICKS : WOMEN_PICKS;
  const minimalistIds = isMen ? MIN_MEN_PICKS : MIN_WOMEN_PICKS;
  const picksProducts = picksIds
    .map((id) => getProductById(id))
    .filter(Boolean);
  const minimalistProducts = minimalistIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  // ─── Men's Landing ──────────────────────────────────────────────────────────
  if (isMen) {
    return (
      <div className="men-page" data-theme="men">
        {/* Hero */}
        <section className="men-hero">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal leading-tight mb-6 animate-gentle-fade-delay-1"
            style={{ color: '#F5F5F0' }}
          >
            Looking for Jewelry?
            <br />
            <span style={{ color: '#C9A96E' }}>At Affordable Price?</span>
          </h1>
          <p
            className="text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-4 animate-gentle-fade-delay-2"
            style={{ color: '#9A9A9A' }}
          >
            Landed on the best place :)
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 animate-gentle-fade-delay-3">
            <Link
              to="/categories"
              className="men-btn-accent px-8 py-3 text-sm"
            >
              Explore Collections
            </Link>
          </div>
        </section>

        {/* Search */}
        <section ref={searchSectionRef} className="max-w-2xl mx-auto px-4 mb-12">
          <form onSubmit={handleSearch} className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6B6B6B' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search for chains, rings, bracelets..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm focus:outline-none transition-all"
              style={{
                background: '#282828',
                border: '1px solid #3A3A3C',
                color: '#F5F5F0',
              }}
              onFocus={e => { e.target.style.borderColor = '#C9A96E'; }}
              onBlur={e => { e.target.style.borderColor = '#3A3A3C'; }}
              id="search-input"
            />
          </form>
          {isSearchMode && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
              <p className="text-sm" style={{ color: '#9A9A9A' }}>
                <span className="font-semibold" style={{ color: '#F5F5F0' }}>{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              <button onClick={handleClearSearch} className="text-xs font-medium transition-colors" style={{ color: '#C9A96E' }}>
                ← Clear search
              </button>
            </div>
          )}
        </section>

        {/* Search Results */}
        {isSearchMode && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-sm" style={{ color: '#9A9A9A' }}>Showing {products.length} piece{products.length !== 1 ? 's' : ''}</p>
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-full transition-all" style={{ background: '#282828', border: '1px solid #3A3A3C', color: '#F5F5F0' }}>
                Filters
              </button>
            </div>
            <div className="flex gap-8">
              <div className="hidden lg:block shrink-0"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
              <div className="lg:hidden"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                  {products.map((product) => <MenProductCard key={product.id} product={product} />)}
                </div>
                {products.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>No jewellery found. Try a different search.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Browse Mode */}
        {!isSearchMode && (
          <>
            {/* Editor's Picks */}
            {picksProducts.length > 0 && (
              <section className="max-w-6xl mx-auto px-4 mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-normal" style={{ color: '#F5F5F0' }}>Bold Picks</h2>
                  <div className="section-divider mt-3" style={{ background: '#C9A96E' }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                  {picksProducts.map((product) => <MenProductCard key={product.id} product={product} />)}
                </div>
              </section>
            )}

            {/* Browse by Category */}
            <section className="max-w-4xl mx-auto px-4 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-normal" style={{ color: '#F5F5F0' }}>Browse by Category</h2>
                <div className="section-divider mt-3" style={{ background: '#C9A96E' }} />
              </div>
              <MenCategoryGrid />
            </section>

            {/* Guides */}
            <section className="max-w-3xl mx-auto px-4 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/buying-guide"
                  className="group p-6 rounded-xl transition-all"
                  style={{ background: '#282828', border: '1px solid #3A3A3C' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A96E'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#3A3A3C'}
                >
                  <span className="text-lg mb-1 block">📖</span>
                  <h3 className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>Buying Guide</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#6B6B6B' }}>Materials, sizing, red flags & how to shop smart online.</p>
                </Link>
                <Link
                  to="/gifting-guide"
                  className="group p-6 rounded-xl transition-all"
                  style={{ background: '#282828', border: '1px solid #3A3A3C' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A96E'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#3A3A3C'}
                >
                  <span className="text-lg mb-1 block">🎁</span>
                  <h3 className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>Gifting Guide</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#6B6B6B' }}>Curated picks by budget & occasion for him.</p>
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    );
  }

  // ─── Women's Landing ────────────────────────────────────────────────────────
  return (
    <div>
      {/* Hero */}
      <section className="landing-hero">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal leading-tight mb-6 animate-gentle-fade-delay-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Looking for Jewelry?
          <br />
          <span style={{ color: 'var(--color-accent)' }}>At Affordable Price?</span>
        </h1>
        <p
          className="text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-4 animate-gentle-fade-delay-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Landed on the best place :)
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 animate-gentle-fade-delay-3">
          <Link
            to="/categories"
            className="px-8 py-3 text-sm font-medium rounded-full transition-all"
            style={{
              background: 'var(--color-accent)',
              color: '#FFFBF7',
              border: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
          >
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Search */}
      <section ref={searchSectionRef} className="max-w-2xl mx-auto px-4 mb-12">
        <form onSubmit={handleSearch} className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search for rings, necklaces, earrings..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm focus:outline-none transition-all"
            style={{
              background: '#FFFBF7',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(184,92,106,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
            id="search-input"
          />
        </form>
        {isSearchMode && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <button onClick={handleClearSearch} className="text-xs font-medium transition-colors" style={{ color: 'var(--color-accent)' }}>
              ← Clear search
            </button>
          </div>
        )}
      </section>

      {/* Search Results */}
      {isSearchMode && (
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Showing {products.length} piece{products.length !== 1 ? 's' : ''}</p>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-full transition-all" style={{ background: '#FFFBF7', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
              Filters
            </button>
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block shrink-0"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
            <div className="lg:hidden"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No jewelry found. Try a different search.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Browse Mode */}
      {!isSearchMode && (
        <>
          {/* Aesthetic Picks */}
          {picksProducts.length > 0 && (
            <section className="max-w-6xl mx-auto px-4 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-normal" style={{ color: 'var(--color-text-primary)' }}>Aesthetic Finds</h2>
                <div className="section-divider mt-3" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                {picksProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            </section>
          )}

          {/* Minimal Picks */}
          {minimalistProducts.length > 0 && (
            <section className="max-w-6xl mx-auto px-4 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-normal" style={{ color: 'var(--color-text-primary)' }}>For minimalist lovers</h2>
                <div className="section-divider mt-3" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
                {minimalistProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/categories"
                  className="text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  View all collections
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>
          )}

          {/* Browse by Category */}
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-normal" style={{ color: 'var(--color-text-primary)' }}>Browse by Category</h2>
              <div className="section-divider mt-3" />
            </div>
            <CategoryGrid />
          </section>

          {/* Guides */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/buying-guide"
                className="group p-6 border rounded-xl transition-all"
                style={{ background: '#FFFBF7', borderColor: 'var(--color-border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                <span className="text-lg mb-1 block">📖</span>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Buying Guide</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>Materials, sizing, red flags & how to shop smart online.</p>
              </Link>
              <Link
                to="/gifting-guide"
                className="group p-6 border rounded-xl transition-all"
                style={{ background: '#FFFBF7', borderColor: 'var(--color-border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                <span className="text-lg mb-1 block">🎁</span>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Gifting Guide</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>Curated picks by budget & occasion for every relationship.</p>
              </Link>
            </div>
          </section>

          {/* Blog Preview */}
          {(() => {
            const blogPosts = getFeaturedPosts(2);
            if (blogPosts.length === 0) return null;
            return (
              <section className="max-w-4xl mx-auto px-4 mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-normal" style={{ color: 'var(--color-text-primary)' }}>From the Journal</h2>
                  <div className="section-divider mt-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {blogPosts.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="group border rounded-xl overflow-hidden transition-all" style={{ background: '#FFFBF7', borderColor: 'var(--color-border)' }}>
                      <div className="aspect-16/10 overflow-hidden relative" style={{ background: 'var(--color-surface)' }}>
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-medium tracking-wide" style={{ color: 'var(--color-accent-secondary)' }}>
                          {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="text-sm font-medium leading-snug mt-1.5 mb-2 line-clamp-2 transition-colors" style={{ color: 'var(--color-text-primary)' }}>{post.title}</h3>
                        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link to="/blog" className="text-xs font-medium transition-colors inline-flex items-center gap-1.5" style={{ color: 'var(--color-accent)' }}>
                    Read more articles
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </section>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default HomePage;
