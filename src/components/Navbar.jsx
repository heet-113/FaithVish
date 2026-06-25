import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const { activeGender, setActiveGender } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isMen = activeGender === 'men';

  const handleGenderSwitch = (gender) => {
    setActiveGender(gender);
    navigate('/');
  };

  return (
    <nav
      className="sticky top-0 z-50 transition-colors duration-500"
      style={{
        background: isMen ? 'rgba(26,26,28,0.97)' : 'rgba(248,241,234,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isMen ? '#282828' : '#E8DDD1'}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main nav row */}
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={isMen ? "/FV_Men.png" : "/FV_Women.png"} alt="FaithVish Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-semibold font-display tracking-tight">
              {isMen ? (
                <>
                  <span style={{ color: '#C9A96E' }}>Faith</span>
                  <span style={{ color: '#F5F5F0' }}>Vish</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#b76c77ff' }}>Faith</span>
                  <span style={{ color: '#5b7bc7ff' }}>Vish</span>
                </>
              )}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/categories', label: 'Collections' },
              { to: '/blog', label: 'Journal' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[13px] font-medium transition-colors"
                style={{ color: isMen ? '#9A9A9A' : '#5A4E42' }}
                onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : '#B85C6A'}
                onMouseLeave={e => e.currentTarget.style.color = isMen ? '#9A9A9A' : '#5A4E42'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Gender pill toggle + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Pill toggle */}
            <div
              className="pill-toggle"
              style={{ background: isMen ? '#282828' : '#F0E8DF' }}
            >
              <button
                onClick={() => handleGenderSwitch('women')}
                className="pill-toggle-btn"
                id="gender-toggle-women"
                style={{
                  background: !isMen ? '#B85C6A' : 'transparent',
                  color: !isMen ? '#FFFBF7' : isMen ? '#6B6B6B' : '#8A7E72',
                }}
              >
                Her
              </button>
              <button
                onClick={() => handleGenderSwitch('men')}
                className="pill-toggle-btn"
                id="gender-toggle-men"
                style={{
                  background: isMen ? '#C9A96E' : 'transparent',
                  color: isMen ? '#1E1E20' : '#8A7E72',
                }}
              >
                Him
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              style={{
                color: isMen ? '#9A9A9A' : '#5A4E42',
                background: mobileMenuOpen ? (isMen ? '#282828' : '#F0E8DF') : 'transparent',
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fade-in-up"
          style={{
            background: isMen ? '#1A1A1C' : '#FFFBF7',
            borderTop: `1px solid ${isMen ? '#282828' : '#E8DDD1'}`,
          }}
        >
          <div className="px-5 py-4 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/categories', label: 'Collections' },
              { to: '/gifting-guide', label: 'Gifting Guide' },
              { to: '/buying-guide', label: 'Buying Guide' },
              { to: '/jewellery-care-guide', label: 'Jewellery Care' },
              { to: '/blog', label: 'Journal' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-[13px] font-medium transition-colors rounded-lg"
                style={{ color: isMen ? '#9A9A9A' : '#5A4E42' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = isMen ? '#C9A96E' : '#B85C6A';
                  e.currentTarget.style.background = isMen ? '#282828' : '#F0E8DF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isMen ? '#9A9A9A' : '#5A4E42';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
