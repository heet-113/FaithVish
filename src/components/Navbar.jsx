import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const { searchQuery, setSearchQuery, searchLive, getCategories, setSelectedCategory } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const categories = getCategories().filter((c) => c !== 'All');

  const handleSearch = (e) => {
    e.preventDefault();
    if (navSearchInput.trim().length >= 2) {
      setSearchQuery(navSearchInput);
      searchLive(navSearchInput);
      navigate('/');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-sm bg-accent flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-accent font-serif tracking-tight hidden sm:block">PriceWise</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className={`relative flex items-center rounded-sm transition-all duration-300 ${searchFocused ? 'ring-2 ring-accent' : ''}`}>
              <div className="absolute left-3 text-text-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={searchRef}
                type="text"
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-accent-secondary rounded-sm text-sm text-text-primary placeholder-text-muted focus:outline-none transition-colors"
                id="nav-search-input"
              />
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-semibold text-accent-secondary hover:underline transition-all uppercase tracking-wider"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="px-3 py-2 text-sm font-semibold text-accent-secondary hover:underline transition-all uppercase tracking-wider"
            >
              Categories
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-sm hover:bg-surface-light transition-all border border-transparent hover:border-border"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Category bar (desktop) */}
        <div className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent whitespace-nowrap rounded-sm border border-transparent hover:border-accent transition-all"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-light border-t border-border animate-fade-in-up">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent rounded-sm hover:bg-surface-hover transition-all border-l-2 border-transparent hover:border-accent"
            >
              Home
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent rounded-sm hover:bg-surface-hover transition-all border-l-2 border-transparent hover:border-accent"
            >
              Categories
            </Link>
            <div className="border-t border-border pt-2 mt-2">
              <p className="px-3 py-1 text-xs font-bold text-text-muted uppercase tracking-widest">Browse by Category</p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="block w-full text-left px-3 py-2 text-sm text-text-secondary font-medium hover:text-accent rounded-sm hover:bg-surface-hover transition-all border-l-2 border-transparent hover:border-accent"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
