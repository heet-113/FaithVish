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
  } = useStore();

  const categories = getCategories();

  const handlePriceChange = (value) => {
    setPriceRange([0, parseInt(value)]);
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
          fixed lg:sticky top-0 lg:top-20 left-0 h-full lg:h-auto w-72 lg:w-64
          bg-surface-light lg:bg-transparent border-r lg:border-r-0 border-border
          z-50 lg:z-auto overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-5 lg:p-0 space-y-6">
          {/* Header (mobile) */}
          <div className="flex items-center justify-between lg:hidden border-b border-border pb-4 mb-4">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors border-2 border-transparent hover:border-border"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border-2 border-border rounded-sm text-sm text-text-primary font-medium focus:outline-none focus:border-accent transition-colors cursor-pointer"
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
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 mt-6">Jewelry Type</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-all border-l-4 ${
                    selectedCategory === cat
                      ? 'bg-surface-hover text-accent font-bold border-accent'
                      : 'text-text-secondary border-transparent hover:bg-surface-hover hover:text-text-primary hover:border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 mt-6">
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
                <span className="text-xs text-text-muted font-bold">₹0</span>
                <span className="text-xs font-bold text-text-primary">
                  ₹{priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={resetFilters}
            className="w-full px-4 py-3 mt-6 text-sm font-bold uppercase tracking-widest text-text-secondary bg-white border-2 border-border rounded-sm hover:border-text-primary hover:text-text-primary transition-all"
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
