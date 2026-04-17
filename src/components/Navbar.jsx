import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const { setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (navSearchInput.trim().length >= 2) {
      setSearchQuery(navSearchInput);
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/FVicon.svg" alt="FaithVish Logo" className="w-9 h-9 object-contain" />
            <span className="text-2xl font-bold font-serif tracking-tight hidden sm:block">
              <span className="text-pink-500">Faith</span><span className="text-cyan-500">Vish</span>
            </span>
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
                placeholder="Search rings, necklaces, earrings..."
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
              className="px-3 py-2 text-sm font-semibold text-text-secondary hover:text-accent transition-all uppercase tracking-wider"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-semibold text-text-secondary hover:text-accent transition-all uppercase tracking-wider"
            >
              About
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
              Collections
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent rounded-sm hover:bg-surface-hover transition-all border-l-2 border-transparent hover:border-accent"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent rounded-sm hover:bg-surface-hover transition-all border-l-2 border-transparent hover:border-accent"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
