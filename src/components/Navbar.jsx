import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const { searchQuery, setSearchQuery, activeGender, setActiveGender } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Synchronize local navbar search input with the store's search query
  useEffect(() => {
    setNavSearchInput(searchQuery);
  }, [searchQuery]);

  const isMen = activeGender === 'men';

  const handleSearch = (e) => {
    e.preventDefault();
    if (navSearchInput.trim().length >= 2) {
      setSearchQuery(navSearchInput);
      navigate('/');
    }
  };

  const handleGenderSwitch = (gender) => {
    setActiveGender(gender);
    setNavSearchInput('');
    navigate('/');
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b transition-colors duration-500"
      style={{
        background: isMen ? '#1A1A1C' : '#ffffff',
        borderColor: isMen ? '#3A3A3C' : 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gender Toggle Bar */}
        <div
          className="flex items-center justify-center py-1.5 gap-1 border-b"
          style={{ borderColor: isMen ? '#282828' : 'var(--color-border)' }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-widest mr-3"
            style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
          >
            Shop For
          </span>
          {/* Women toggle */}
          <button
            onClick={() => handleGenderSwitch('women')}
            id="gender-toggle-women"
            className="flex items-center gap-1.5 px-4 py-1 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: !isMen ? '#EC4899' : 'transparent',
              color: !isMen ? '#ffffff' : isMen ? '#6B6B6B' : 'var(--color-text-muted)',
              border: !isMen ? '2px solid #EC4899' : '2px solid transparent',
              borderRadius: '2px',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 100 14A7 7 0 0012 2zm0 2a5 5 0 110 10A5 5 0 0112 4zm-1 11.93V20H9v2h6v-2h-2v-2.07A7.001 7.001 0 0012 2a7 7 0 00-1 13.93z"/>
            </svg>
            Women
          </button>

          {/* Divider */}
          <div
            className="w-px h-4"
            style={{ background: isMen ? '#3A3A3C' : 'var(--color-border)' }}
          />

          {/* Men toggle */}
          <button
            onClick={() => handleGenderSwitch('men')}
            id="gender-toggle-men"
            className="flex items-center gap-1.5 px-4 py-1 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: isMen ? '#C9A96E' : 'transparent',
              color: isMen ? '#1E1E20' : 'var(--color-text-muted)',
              border: isMen ? '2px solid #C9A96E' : '2px solid transparent',
              borderRadius: '2px',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 9a3 3 0 116 0 3 3 0 01-6 0zm3-5a5 5 0 100 10A5 5 0 0012 4zm7 1h-2V3h-2v2h-2v2h2v2h2V7h2V5zM9.07 15.01A6.964 6.964 0 005 21h2a4.978 4.978 0 014.856-3.999A5.015 5.015 0 0117 21h2a6.964 6.964 0 00-4.07-5.99A7.07 7.07 0 0112 15c-.66 0-1.3.08-1.93.01z"/>
            </svg>
            Men
          </button>
        </div>

        {/* Main nav row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/FVicon.svg" alt="FaithVish Logo" className="w-9 h-9 object-contain" />
            <span className="text-2xl font-bold font-serif tracking-tight hidden sm:block">
              {isMen ? (
                <>
                  <span style={{ color: '#C9A96E' }}>Faith</span>
                  <span style={{ color: '#C9A96E' }}>Vish</span>
                </>
              ) : (
                <>
                  <span className="text-pink-500">Faith</span>
                  <span className="text-cyan-500">Vish</span>
                </>
              )}
            </span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div
              className={`relative flex items-center rounded-sm transition-all duration-300 ${searchFocused ? 'ring-2' : ''}`}
              style={{ '--tw-ring-color': isMen ? '#C9A96E' : 'var(--color-accent)' }}
            >
              <div className="absolute left-3" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>
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
                placeholder={isMen ? "Search chains, rings, bracelets..." : "Search rings, necklaces, earrings..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm text-sm font-medium focus:outline-none transition-colors"
                style={{
                  background: isMen ? '#282828' : '#ffffff',
                  border: `2px solid ${isMen ? '#3A3A3C' : 'var(--color-accent-secondary)'}`,
                  color: isMen ? '#F5F5F0' : 'var(--color-text-primary)',
                }}
                id="nav-search-input"
              />
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/categories', label: 'Collections' },
              { to: '/gifting-guide', label: 'Guides' },
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-2 text-sm font-semibold transition-all uppercase tracking-wider hover:underline"
                style={{ color: isMen ? '#9A9A9A' : 'var(--color-text-secondary)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-sm transition-all border border-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            style={{ color: isMen ? '#9A9A9A' : 'var(--color-text-secondary)' }}
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
        <div
          className="md:hidden border-t animate-fade-in-up"
          style={{
            background: isMen ? '#1A1A1C' : 'var(--color-surface-light)',
            borderColor: isMen ? '#3A3A3C' : 'var(--color-border)',
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/categories', label: 'Collections' },
              { to: '/top-rings-under-1000', label: 'Best Rings Under ₹1,000' },
              { to: '/gifting-guide', label: 'Gifting Guide' },
              { to: '/buying-guide', label: 'Buying Guide' },
              { to: '/jewellery-care-guide', label: 'Jewellery Care' },
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-bold uppercase tracking-widest rounded-sm transition-all border-l-2 border-transparent"
                style={{ color: isMen ? '#9A9A9A' : 'var(--color-text-secondary)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderLeftColor = isMen ? '#C9A96E' : 'var(--color-accent)';
                  e.currentTarget.style.color = isMen ? '#C9A96E' : 'var(--color-accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderLeftColor = 'transparent';
                  e.currentTarget.style.color = isMen ? '#9A9A9A' : 'var(--color-text-secondary)';
                }}
              >
                {label}
              </Link>
            ))}

            {/* Mobile gender toggle */}
            <div className="pt-3 mt-3 border-t flex gap-2" style={{ borderColor: isMen ? '#3A3A3C' : 'var(--color-border)' }}>
              <button
                onClick={() => { handleGenderSwitch('women'); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                style={{
                  background: !isMen ? '#EC4899' : 'transparent',
                  color: !isMen ? '#ffffff' : '#6B6B6B',
                  border: `2px solid ${!isMen ? '#EC4899' : '#3A3A3C'}`,
                  borderRadius: '2px',
                }}
              >
                Women
              </button>
              <button
                onClick={() => { handleGenderSwitch('men'); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                style={{
                  background: isMen ? '#C9A96E' : 'transparent',
                  color: isMen ? '#1E1E20' : '#6B6B6B',
                  border: `2px solid ${isMen ? '#C9A96E' : '#3A3A3C'}`,
                  borderRadius: '2px',
                }}
              >
                Men
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
