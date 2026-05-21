import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { JEWELRY_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS, formatPrice } from '../utils/constants';
import { getCategoryIcon } from '../components/CategoryGrid';
import { getMenCategoryIcon } from '../components/MenCategoryGrid';

const CategoriesPage = () => {
  const { products, setSelectedCategory, setSearchQuery, activeGender } = useStore();
  const navigate = useNavigate();
  const isMen = activeGender === 'men';
  const categories = isMen ? MEN_CATEGORIES : JEWELRY_CATEGORIES;

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(`category-${category}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div
        className="text-center mb-10 pb-4"
        style={{ borderBottom: `2px solid ${isMen ? m.border : 'var(--color-border)'}` }}
      >
        <p
          className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-3"
          style={{ color: isMen ? m.accent : 'var(--color-accent-secondary)' }}
        >
          {isMen ? 'Built for Him' : 'Curated for You'}
        </p>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-3 font-serif uppercase tracking-widest"
          style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
        >
          {isMen ? "Men's Collections" : 'Our Collections'}
        </h1>
        <p
          className="text-sm sm:text-base max-w-xl mx-auto"
          style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
        >
          {isMen
            ? 'Handpicked chains, rings & bracelets — bold, minimal, and built to last.'
            : 'Explore our handpicked jewelry across beautiful categories — from everyday elegance to bridal grandeur.'}
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {categories.map((category) => {
          const stats = getCategoryStats(category);
          const icon = isMen ? getMenCategoryIcon(category) : getCategoryIcon(category);
          const displayLabel = isMen ? (MEN_CATEGORY_LABELS[category] || category) : category;

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="text-left p-6 group cursor-pointer transition-all"
              style={{
                background: isMen ? m.card : '#ffffff',
                border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
              }}
              id={`collection-${category}`}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = isMen ? m.accent : 'var(--color-accent)';
                if (isMen) e.currentTarget.style.borderLeftWidth = '4px';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isMen ? m.border : 'var(--color-border)';
                if (isMen) e.currentTarget.style.borderLeftWidth = '1px';
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-sm flex items-center justify-center mb-4 transition-transform duration-300"
                style={{
                  background: isMen ? '#303032' : 'var(--color-surface-light)',
                  border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                  color: isMen ? m.accent : 'var(--color-text-secondary)',
                }}
              >
                {icon}
              </div>

              {/* Info */}
              <h3
                className="text-lg font-bold font-serif uppercase tracking-widest mb-1 transition-colors"
                style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
              >
                {displayLabel}
              </h3>
              <p className="text-sm mb-4" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                {stats.count} piece{stats.count !== 1 ? 's' : ''} available
              </p>

              {/* Price range */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: `1px solid ${isMen ? m.border : 'var(--color-border)'}` }}
              >
                <div>
                  <p className="text-[11px] sm:text-[10px] uppercase tracking-wider font-bold" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                    Starting from
                  </p>
                  <p className="text-lg font-bold" style={{ color: isMen ? m.accent : 'var(--color-accent-secondary)' }}>
                    {stats.minPrice > 0 ? formatPrice(stats.minPrice) : '—'}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors"
                  style={{
                    background: isMen ? '#303032' : '#ffffff',
                    border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                  }}
                >
                  <svg className="w-4 h-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Browse all */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all"
          style={{
            background: isMen ? m.accent : 'var(--color-accent)',
            color: isMen ? m.bg : '#ffffff',
            border: `2px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
          }}
        >
          {isMen ? "View All Men's Jewelry" : 'View All Jewelry'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
