import useStore from '../store/useStore';

const FilterSidebar = ({ isOpen, onClose }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    getCategories,
    resetFilters,
    activeGender,
  } = useStore();

  const isMen = activeGender === 'men';
  const categories = getCategories();

  const handlePriceChange = (value) => {
    setPriceRange([0, parseInt(value)]);
  };

  // Men's palette
  const m = {
    bg: '#282828',
    bgInput: '#1E1E20',
    border: '#3A3A3C',
    accent: '#C9A96E',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 lg:top-20 left-0 h-full lg:h-auto w-[85vw] max-w-72 lg:w-64
          z-50 lg:z-auto overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: isMen ? m.bg : 'var(--color-surface-light)',
          borderRight: isOpen ? `1px solid ${isMen ? m.border : 'var(--color-border)'}` : 'none',
        }}
      >
        <div className="p-5 pb-24 lg:p-0 lg:pb-0 space-y-6">
          {/* Header (mobile) */}
          <div
            className="flex items-center justify-between lg:hidden pb-4 mb-4"
            style={{ borderBottom: `1px solid ${isMen ? m.border : 'var(--color-border)'}` }}
          >
            <h2
              className="text-xl font-bold font-serif uppercase tracking-widest"
              style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
            >
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-3 sm:p-1.5 rounded-sm transition-colors"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
            >
              <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sort */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
            >
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-3 sm:py-2.5 rounded-sm text-sm font-medium focus:outline-none transition-colors cursor-pointer"
              style={{
                background: isMen ? m.bgInput : '#ffffff',
                border: `2px solid ${isMen ? m.border : 'var(--color-border)'}`,
                color: isMen ? m.textPrimary : 'var(--color-text-primary)',
              }}
              id="sort-select"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Popular</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3 mt-6"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
            >
              Jewelry Type
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full text-left px-3 py-4 sm:py-2 text-sm rounded-sm transition-all border-l-4"
                    style={{
                      background: isActive
                        ? (isMen ? '#303032' : 'var(--color-surface-hover)')
                        : 'transparent',
                      color: isActive
                        ? (isMen ? m.accent : 'var(--color-accent)')
                        : (isMen ? m.textSecondary : 'var(--color-text-secondary)'),
                      fontWeight: isActive ? 700 : 400,
                      borderLeftColor: isActive
                        ? (isMen ? m.accent : 'var(--color-accent)')
                        : 'transparent',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3 mt-6"
              style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
            >
              Price Range
            </h3>
            <div className="px-1">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full"
                id="price-range-slider"
              />
              <div className="flex justify-between mt-2">
                <span
                  className="text-xs font-bold"
                  style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
                >
                  ₹0
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
                >
                  ₹{priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={resetFilters}
            className="w-full px-4 py-3 mt-6 text-sm font-bold uppercase tracking-widest rounded-sm transition-all"
            style={{
              background: isMen ? m.bgInput : '#ffffff',
              border: `2px solid ${isMen ? m.border : 'var(--color-border)'}`,
              color: isMen ? m.textSecondary : 'var(--color-text-secondary)',
            }}
            id="reset-filters-btn"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
