import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MenProductCard from '../components/MenProductCard';
import FilterSidebar from '../components/FilterSidebar';
import CategoryGrid from '../components/CategoryGrid';
import MenCategoryGrid from '../components/MenCategoryGrid';
import { getCategoryIcon } from '../components/CategoryGrid';
import { getMenCategoryIcon } from '../components/MenCategoryGrid';
import { WOMEN_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS } from '../utils/constants';
import { getFeaturedPosts } from '../data/blog/index.js';

// ─── Women's Category Section ────────────────────────────────────────────────
const CategorySection = ({ category, products }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };
  if (!products || products.length === 0) return null;
  const icon = getCategoryIcon(category);

  return (
    <section id={`category-${category}`} className="mb-10 pt-4">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent">
              {icon}
            </div>
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">{category}</h2>
          </div>
          <div className="w-12 h-[3px] bg-accent mt-3" />
          <p className="text-xs text-text-secondary mt-2 tracking-wide font-medium uppercase">{products.length} pieces available</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll('left')} className="hidden sm:flex w-10 h-10 bg-white border-2 border-border hover:border-accent hover:text-accent items-center justify-center text-text-muted transition-all rounded-sm" aria-label="Scroll left">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="hidden sm:flex w-8 h-8 rounded-sm bg-white border border-border hover:border-accent hover:text-accent items-center justify-center text-text-muted transition-all" aria-label="Scroll right">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[240px] sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Men's Category Section ───────────────────────────────────────────────────
const MenCategorySection = ({ category, products }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };
  if (!products || products.length === 0) return null;
  const icon = getMenCategoryIcon(category);
  const displayLabel = MEN_CATEGORY_LABELS[category] || category;

  return (
    <section id={`category-${category}`} className="mb-10 pt-4">
      <div className="flex items-center justify-between mb-6 pb-2" style={{ borderBottom: '1px solid #3A3A3C' }}>
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ background: '#282828', border: '1px solid #3A3A3C', borderRadius: '2px', color: '#C9A96E' }}>
              {icon}
            </div>
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest" style={{ color: '#F5F5F0' }}>{displayLabel}</h2>
          </div>
          <div className="men-section-underline" />
          <p className="text-xs mt-2 tracking-wide font-medium uppercase" style={{ color: '#6B6B6B' }}>{products.length} pieces available</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll('left')} className="hidden sm:flex w-10 h-10 items-center justify-center transition-all" style={{ background: '#282828', border: '2px solid #3A3A3C', borderRadius: '2px', color: '#9A9A9A' }} aria-label="Scroll left"
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A3A3C'; e.currentTarget.style.color = '#9A9A9A'; }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="hidden sm:flex w-8 h-8 items-center justify-center transition-all" style={{ background: '#282828', border: '1px solid #3A3A3C', borderRadius: '2px', color: '#9A9A9A' }} aria-label="Scroll right"
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A3A3C'; e.currentTarget.style.color = '#9A9A9A'; }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[240px] sm:w-[280px]">
            <MenProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SectionSkeleton = ({ isMen }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="skeleton w-10 h-10 rounded-sm" style={isMen ? { background: '#282828' } : {}} />
      <div>
        <div className="skeleton h-5 w-32 rounded mb-1" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="shrink-0 w-[240px] sm:w-[280px] overflow-hidden" style={isMen ? { background: '#282828', border: '1px solid #3A3A3C' } : {}}>
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

// ─── Main HomePage ────────────────────────────────────────────────────────────
const HomePage = () => {
  const {
    getFilteredProducts,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    getProductsByCategory,
    activeGender,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const products = getFilteredProducts();
  const searchSectionRef = useRef(null);

  // Synchronize local search input with the store's search query
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Smoothly scroll to the search results section when a query is active
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
      // Clear search results when user clears the box
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group products by category for the active gender's sections
  const activeCategories = isMen ? MEN_CATEGORIES : WOMEN_CATEGORIES;
  const categorySections = activeCategories.map((category) => ({
    category,
    products: getProductsByCategory(category),
  })).filter((s) => s.products.length > 0);

  // ─── Men's Layout ───────────────────────────────────────────────────────────
  if (isMen) {
    return (
      <div className="men-page" data-theme="men">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Men's Hero */}
          <div className="mb-10 text-center py-16 men-hero">
            <p className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-4 men-gold-pulse" style={{ color: '#C9A96E' }}>
              Forged for Him
            </p>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 font-serif uppercase tracking-widest leading-tight" style={{ color: '#F5F5F0' }}>
              Men's Fine
              <br />
              <span style={{ color: '#C9A96E', textDecoration: 'underline', textDecorationThickness: '4px', textUnderlineOffset: '8px' }}>
                Jewellery
              </span>
            </h1>
            <p className="text-sm sm:text-base max-w-2xl mx-auto font-medium mt-8 uppercase tracking-widest" style={{ color: '#9A9A9A' }}>
              Bold. Minimal. Crafted for the modern man.
            </p>
          </div>

          {/* Men's Intent Cards */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 sm:p-8" style={{ background: '#282828', border: '1px solid #3A3A3C' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(184,167,122,0.1)', border: '1px solid rgba(184,167,122,0.3)', borderRadius: '2px' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C9A96E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold font-serif uppercase tracking-widest" style={{ color: '#F5F5F0' }}>Why FaithVish for Men?</h2>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#9A9A9A' }}>
                Men's jewellery online is full of poor-quality metal that turns green in a week. We handpick only the best stainless steel, sterling silver, and chains built to last.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>
                Every product has <strong style={{ color: '#F5F5F0' }}>real ratings, real reviews, and honest pros & cons</strong>. No fluff just what works for daily wear, gifting, or making a statement.
              </p>
            </div>
            <div className="p-6 sm:p-8" style={{ background: '#282828', border: '1px solid #3A3A3C' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '2px' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C9A96E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold font-serif uppercase tracking-widest" style={{ color: '#F5F5F0' }}>Who Is This For?</h2>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Men wanting their first bracelet or chain starting simple',
                  'Gift buyers for boyfriends, husbands, or brothers',
                  'Office-goers who want minimal, subtle accessories',
                  'Gym & outdoors guys who need durable, sweat-proof pieces',
                  'Budget-conscious shoppers: great style under ₹700',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#9A9A9A' }}>
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: '#C9A96E' }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search bar — Men's theme */}
          <div ref={searchSectionRef} className="mb-8 p-6" style={{ background: '#282828', border: '1px solid #3A3A3C', boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C9A96E' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="e.g. bold chain, silver ring, gold bracelet..."
                  className="w-full pl-12 pr-4 py-3 text-sm font-medium focus:outline-none transition-colors rounded-sm"
                  style={{
                    background: '#1E1E20',
                    border: '2px solid #3A3A3C',
                    color: '#F5F5F0',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#C9A96E'; }}
                  onBlur={e => { e.target.style.borderColor = '#3A3A3C'; }}
                  id="search-input"
                />
              </div>
              <button
                type="submit"
                disabled={searchInput.trim().length < 1}
                className="px-8 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-all shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start disabled:opacity-50 disabled:cursor-not-allowed men-btn-accent"
              >
                Search
              </button>
            </form>
            {isSearchMode && (
              <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-3" style={{ borderTop: '1px solid #3A3A3C' }}>
                <p className="text-sm" style={{ color: '#9A9A9A' }}>
                  <span className="font-semibold" style={{ color: '#F5F5F0' }}>{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                <button onClick={handleClearSearch} className="text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: '#C9A96E' }}>
                  ← Back to All Jewellery
                </button>
              </div>
            )}
          </div>

          {/* Search Results Mode — Men's */}
          {isSearchMode && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="text-sm" style={{ color: '#9A9A9A' }}>Showing {products.length} piece{products.length !== 1 ? 's' : ''}</p>
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all" style={{ background: '#282828', border: '2px solid #3A3A3C', borderBottom: '4px solid #C9A96E', color: '#F5F5F0', borderRadius: '2px' }}>
                  Filters
                </button>
              </div>
              <div className="flex gap-8">
                <div className="hidden lg:block shrink-0"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
                <div className="lg:hidden"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
                    {products.map((product) => <MenProductCard key={product.id} product={product} />)}
                  </div>
                  {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 flex items-center justify-center mb-4" style={{ background: '#282828', borderRadius: '16px' }}>
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6B6B6B' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#F5F5F0' }}>No jewellery found</h3>
                      <p className="text-sm max-w-sm" style={{ color: '#6B6B6B' }}>Try a different search term or browse our collections below.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Browse Mode — Men's */}
          {!isSearchMode && (
            <>
              {/* Men's Category Grid */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6 pb-2" style={{ borderBottom: '1px solid #3A3A3C' }}>
                  <div>
                    <h2 className="text-2xl font-bold font-serif uppercase tracking-widest" style={{ color: '#C9A96E' }}>Shop by Type</h2>
                    <div className="men-section-underline" />
                  </div>
                </div>
                <MenCategoryGrid onCategoryClick={(cat) => handleCategoryClick(cat)} selectedCategory={selectedCategory} />
              </div>

              {/* Men's Category Sections */}
              {categorySections.map(({ category, products: catProducts }) => (
                <MenCategorySection key={category} category={category} products={catProducts} />
              ))}

              {/* Empty state */}
              {categorySections.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 flex items-center justify-center mb-4" style={{ background: '#282828', borderRadius: '16px' }}>
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6B6B6B' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#F5F5F0' }}>Men's collection coming soon</h3>
                  <p className="text-sm max-w-sm" style={{ color: '#6B6B6B' }}>We're handpicking the best men's jewellery. Check back soon.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── Women's Layout (original, unchanged) ──────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero section */}
      <div className="mb-10 text-center py-16 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-4">Curated with Love</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Discover Exquisite<br />
          <span className="text-accent underline decoration-4 underline-offset-8">Jewelry</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium mt-8 uppercase tracking-widest">
          Handpicked jewelry from India's most trusted brands for every occasion.
        </p>
      </div>

      {/* Why FaithVish — Intent Section */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-border p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-base font-bold font-serif uppercase tracking-widest text-text-primary">Why FaithVish?</h2>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            Finding trustworthy jewellery online is overwhelming. Thousands of listings, inflated MRPs, unclear materials,
            and no way to know if a ₹200 ring is actually decent. We built FaithVish to cut through the noise.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Every product here is handpicked from Amazon India, with <strong className="text-text-primary">real ratings, real reviews, and honest pros & cons</strong>.
            We don't just list products, we tell you what's genuinely good, what to watch out for, and who each piece is best for.
          </p>
        </div>

        <div className="bg-white border border-border p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-accent-secondary/10 border border-accent-secondary/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-base font-bold font-serif uppercase tracking-widest text-text-primary">Who Is This For?</h2>
          </div>
          <ul className="space-y-2.5">
            {[
              'Budget-conscious shoppers looking for jewellery under ₹500–₹1,000',
              'Gift buyers who need quick, reliable recommendations',
              'First-time online jewellery buyers unsure which brands to trust',
              'Women who want trendy fashion jewellery without overpaying',
              'Anyone who prefers reading honest reviews before clicking "Buy"',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-accent mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buying Guides */}
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/top-rings-under-1000" className="group bg-white border border-border p-5 hover:border-accent transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"><span className="text-xl">💍</span></div>
          <div>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">Best Rings Under ₹1,000</h3>
            <p className="text-xs text-text-muted mt-0.5">Ranked by real Amazon ratings & reviews</p>
          </div>
          <svg className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
        <Link to="/gifting-guide" className="group bg-white border border-border p-5 hover:border-accent transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-accent-secondary/10 border border-accent-secondary/30 flex items-center justify-center shrink-0 group-hover:bg-accent-secondary/20 transition-colors"><span className="text-xl">🎁</span></div>
          <div>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">Best Jewelry for Gifting</h3>
            <p className="text-xs text-text-muted mt-0.5">Curated gift picks by budget & occasion</p>
          </div>
          <svg className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
        <Link to="/buying-guide" className="group bg-white border border-border p-5 hover:border-accent transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors"><span className="text-xl">📖</span></div>
          <div>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">Online Buying Guide</h3>
            <p className="text-xs text-text-muted mt-0.5">Materials, sizing, red flags & how to shop smart</p>
          </div>
          <svg className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
        <Link to="/jewellery-care-guide" className="group bg-white border border-border p-5 hover:border-accent transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors"><span className="text-xl">✨</span></div>
          <div>
            <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">Jewellery Care Guide</h3>
            <p className="text-xs text-text-muted mt-0.5">Make your fashion jewellery last longer</p>
          </div>
          <svg className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Search bar */}
      <div ref={searchSectionRef} className="mb-8 bg-white border border-border p-6 shadow-[4px_4px_0_rgba(0,0,0,0.05)] rounded-none">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="e.g. aesthetic rings, gold necklace, silver earrings..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-accent-secondary rounded-sm text-sm text-text-primary font-medium placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              id="search-input"
            />
          </div>
          <button
            type="submit"
            disabled={searchInput.trim().length < 1}
            className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 border-accent flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start shrink-0"
          >
            Search
          </button>
        </form>
        {isSearchMode && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <button onClick={handleClearSearch} className="text-xs text-accent hover:text-accent-light transition-colors font-bold uppercase tracking-wider">
              ← Back to All Jewelry
            </button>
          </div>
        )}
      </div>

      {/* Search Results Mode */}
      {isSearchMode && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-text-secondary">Showing {products.length} piece{products.length !== 1 ? 's' : ''}</p>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-widest bg-white border-2 border-border border-b-4 border-b-accent rounded-sm hover:bg-surface-hover transition-all text-text-primary">
              Filters
            </button>
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block shrink-0"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
            <div className="lg:hidden"><FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /></div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
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

      {/* Browse Mode */}
      {!isSearchMode && (
        <>
          {/* Category Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-accent-secondary">Shop by Collection</h2>
                <div className="w-16 h-[3px] bg-accent mt-2" />
              </div>
            </div>
            <CategoryGrid onCategoryClick={(cat) => handleCategoryClick(cat)} selectedCategory={selectedCategory} />
          </div>

          {/* Category sections */}
          {categorySections.map(({ category, products: catProducts }) => (
            <CategorySection key={category} category={category} products={catProducts} />
          ))}

          {/* Blog Section */}
          {(() => {
            const blogPosts = getFeaturedPosts(3);
            if (blogPosts.length === 0) return null;
            return (
              <div className="mb-12 mt-4">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-accent-secondary">Latest from Our Blog</h2>
                    <div className="w-16 h-[3px] bg-accent mt-2" />
                  </div>
                  <Link to="/blog" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:gap-3 transition-all">
                    View All
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-white border border-border hover:border-accent transition-all overflow-hidden">
                      <div className="aspect-[16/10] overflow-hidden bg-surface relative">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-text-primary border border-border">{post.category}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-widest text-accent-secondary">{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <h3 className="text-base font-bold font-serif text-text-primary group-hover:text-accent transition-colors leading-snug mt-1.5 mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:gap-3 transition-all">
                          <span>Read Article</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-6 sm:hidden">
                  <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:gap-3 transition-all">
                    View All Articles
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            );
          })()}

          {/* Empty state */}
          {categorySections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-2xl bg-surface-card flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">No products yet</h3>
              <p className="text-sm text-text-muted max-w-sm">Products will appear here once they are added to the catalog.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
