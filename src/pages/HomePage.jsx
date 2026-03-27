import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import BrandSlider from '../components/BrandSlider';
import CategoryGrid from '../components/CategoryGrid';
import { PLATFORM_COLORS } from '../utils/constants';
const CATEGORY_COLORS = {
  Electronics: 'from-blue-600/20 to-indigo-600/20 border-blue-500/30',
  Footwear: 'from-orange-600/20 to-amber-600/20 border-orange-500/30',
  Clothing: 'from-pink-600/20 to-rose-600/20 border-pink-500/30',
  Beauty: 'from-purple-600/20 to-fuchsia-600/20 border-purple-500/30',
  Books: 'from-emerald-600/20 to-green-600/20 border-emerald-500/30',
  'Home & Kitchen': 'from-teal-600/20 to-cyan-600/20 border-teal-500/30',
  Accessories: 'from-yellow-600/20 to-amber-600/20 border-yellow-500/30',
  General: 'from-slate-600/20 to-gray-600/20 border-slate-500/30',
};

const getCategoryIcon = (cat) => {
  const commonClasses = "w-6 h-6 text-current";
  switch(cat) {
    case 'Electronics': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'Fashion':
    case 'Clothing': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'Footwear': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
    case 'Beauty': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'Home & Kitchen':
    case 'Furniture': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'Books': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    default: return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
  }
};

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
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.General;

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
          <p className="text-xs text-text-secondary mt-2 tracking-wide font-medium uppercase">{products.length} products found</p>
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

// Store section component (horizontal scroll)
const StoreSection = ({ storeName, products }) => {
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

  const platformStyle = PLATFORM_COLORS[storeName] || { bg: 'bg-surface-card', text: 'text-text-primary', border: 'border-border' };

  return (
    <section id={`store-${storeName}`} className="mb-10 pt-4">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
        <div>
          <h2 className={`text-xl font-bold font-serif uppercase tracking-widest text-accent-secondary`}>{storeName}</h2>
          <div className="w-12 h-[3px] bg-accent mt-2"></div>
          <p className="text-xs text-text-secondary mt-2 tracking-wide font-medium uppercase">{products.length} products found</p>
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
    selectedPlatform,
    isLoading,
    liveError,
    liveProducts,
    serverOnline,
    lastFetchedAt,
    liveResultCounts,
    searchLive,
    checkServer,
    setSearchQuery,
    featuredSections,
    featuredLoading,
    featuredLoaded,
    loadFeatured,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState('category'); // 'category' | 'store'
  const products = getFilteredProducts();

  const hasActiveFilters = selectedCategory !== 'All' || selectedPlatform !== 'All';
  const isSearchMode = liveProducts.length > 0;

  // Compute products by store
  const storeSections = useMemo(() => {
    if (!featuredLoaded) return {};
    const stores = {};
    Object.values(featuredSections).forEach(section => {
      section.products?.forEach(product => {
        product.platforms.forEach(platform => {
          if (!stores[platform.name]) {
            stores[platform.name] = { products: [] };
          }
          if (!stores[platform.name].products.find(p => p.id === product.id)) {
            stores[platform.name].products.push(product);
          }
        });
      });
    });
    return stores;
  }, [featuredSections, featuredLoaded]);

  // Load featured products on mount
  useEffect(() => {
    checkServer();
    loadFeatured();
  }, []);

  // Search submit
  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault();
      if (searchInput.trim().length >= 2) {
        setSearchQuery(searchInput);
        searchLive(searchInput);
      }
    },
    [searchInput, searchLive, setSearchQuery]
  );

  // Clear search and go back to featured view
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    useStore.getState().clearLiveResults();
    setSearchInput('');
  }, [setSearchQuery]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Scroll to the respective section if it exists
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Time ago helper
  const getTimeAgo = (isoString) => {
    if (!isoString) return '';
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  // Order for category sections
  const sectionOrder = ['Electronics', 'Footwear', 'Clothing', 'Beauty', 'Books', 'Home & Kitchen', 'Accessories'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero section */}
      <div className="mb-10 text-center py-16 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Compare Real Prices<br/>
          <span className="text-accent underline decoration-4 underline-offset-8">Across Platforms</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium mt-8 uppercase tracking-widest">
          Live prices from Flipkart, Snapdeal, and Shopclues — all in one place.
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
              placeholder="Search for any product... (e.g. iPhone, headphones, shoes)"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-accent-secondary rounded-sm text-sm text-text-primary font-medium placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              id="search-input"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || searchInput.trim().length < 2}
            className="px-8 py-3 bg-accent text-white text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 border-accent flex items-center gap-2 shrink-0"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>

        {/* Info bar for search results */}
        {isSearchMode && (lastFetchedAt || liveError) && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] text-text-muted">
              {lastFetchedAt && liveResultCounts && (
                <>
                  <span>Updated {getTimeAgo(lastFetchedAt)}</span>
                  <span>•</span>
                  <span className="text-flipkart">Flipkart: {liveResultCounts.flipkart || 0}</span>
                  <span className="text-snapdeal">Snapdeal: {liveResultCounts.snapdeal || 0}</span>
                  <span style={{ color: '#6C3483' }}>Shopclues: {liveResultCounts.shopclues || 0}</span>
                </>
              )}
            </div>
            <button
              onClick={handleClearSearch}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              ← Back to featured
            </button>
          </div>
        )}
        {liveError && (
          <p className="mt-2 text-xs text-red-400">⚠️ {liveError}</p>
        )}

        {/* Server offline warning */}
        {!serverOnline && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-red-400">
              ⚠️ Backend server is offline. Start it with: <code className="px-1.5 py-0.5 bg-surface rounded text-[10px]">cd server && npm start</code>
            </p>
          </div>
        )}
      </div>

      {/* Brand Slider */}
      {!isSearchMode && <BrandSlider />}

      {/* View Mode Tabs */}
      {!isSearchMode && (
        <div className="flex items-center justify-center mb-8 border-b-2 border-border gap-6">
          <button
            onClick={() => setActiveTab('category')}
            className={`py-3 text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === 'category'
                ? 'border-b-4 border-accent text-accent'
                : 'text-text-muted hover:text-text-primary border-b-4 border-transparent'
            }`}
          >
            Shop by Category
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`py-3 text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === 'store'
                ? 'border-b-4 border-accent text-accent'
                : 'text-text-muted hover:text-text-primary border-b-4 border-transparent'
            }`}
          >
            Shop by Store
          </button>
        </div>
      )}

      {/* Category Grid */}
      {!isSearchMode && activeTab === 'category' && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-accent-secondary">Shop by Category</h2>
              <div className="w-16 h-[3px] bg-accent mt-2"></div>
            </div>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold uppercase tracking-widest text-accent hover:underline transition-colors"
            >
              View All Categories
            </button>
          </div>
          <CategoryGrid 
            onCategoryClick={(cat) => handleCategoryClick(cat)} 
            selectedCategory={selectedCategory} 
          />
        </div>
      )}

      {/* ========== SEARCH RESULTS MODE ========== */}
      {isSearchMode && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">{products.length}</span> result{products.length !== 1 ? 's' : ''} for "{searchQuery}"
              {hasActiveFilters && <span className="text-accent-light"> (filtered)</span>}
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
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card overflow-hidden">
                      <div className="skeleton aspect-square" />
                      <div className="p-4 space-y-3">
                        <div className="skeleton h-4 w-3/4 rounded" />
                        <div className="skeleton h-3 w-1/2 rounded" />
                        <div className="skeleton h-8 w-full rounded mt-3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ========== FEATURED / HOMEPAGE MODE ========== */}
      {!isSearchMode && (
        <>
          {/* Loading skeletons */}
          {featuredLoading && (
            <>
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
            </>
          )}

          {/* Category/Store sections */}
          {featuredLoaded && activeTab === 'category' && (
            <>
              {sectionOrder.map((category) => {
                const section = featuredSections[category];
                if (!section || !section.products || section.products.length === 0) return null;
                return (
                  <CategorySection
                    key={category}
                    category={category}
                    products={section.products}
                  />
                );
              })}

              {/* Any extra categories not in the order */}
              {Object.entries(featuredSections)
                .filter(([cat]) => !sectionOrder.includes(cat))
                .map(([category, section]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    products={section.products}
                  />
                ))}
            </>
          )}

          {featuredLoaded && activeTab === 'store' && (
            <>
              {Object.entries(storeSections)
                .sort((a,b) => b[1].products.length - a[1].products.length)
                .map(([storeName, section]) => (
                  <StoreSection
                    key={storeName}
                    storeName={storeName}
                    products={section.products}
                  />
                ))}
            </>
          )}

          {/* Empty state if no featured loaded */}
              {Object.keys(featuredSections).length === 0 && !featuredLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-surface-card flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    Loading products...
                  </h3>
                  <p className="text-sm text-text-muted max-w-sm">
                    Make sure the backend server is running: <code className="px-1.5 py-0.5 bg-surface-card rounded text-[10px]">cd server && npm start</code>
                  </p>
                </div>
              )}
        </>
      )}
    </div>
  );
};

export default HomePage;
